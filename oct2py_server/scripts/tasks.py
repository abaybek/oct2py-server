# Create your tasks here
from __future__ import absolute_import, unicode_literals
from celery import shared_task, current_task
from celery.exceptions import Ignore, Reject

from scipy.fftpack import fft
from numpy import random

from scripts.models import ScriptCode

from django.conf import settings

@shared_task
def fft_random(n):
    """
    Brainless number crunching just to have a substantial task:
    """
    for i in range(n):
        x = random.normal(0, 0.1, 2000)
        y = fft(x)
        if(i%30 == 0):
            process_percent = int(100 * float(i) / float(n))
            current_task.update_state(state='PROGRESS',
                                      meta={'process_percent': process_percent})
    return random.random()

@shared_task
def add(x,y):
    for i in range(1000000000):
        a = x+y
    return x+y

from oct2py import Oct2Py, Oct2PyError
import glob
SCRIPT_TIME = getattr(settings, 'CELERY_OCTAVE_RUNNING_SCRIPT_TIME', 3)


def get_name_if_image_exist(user_folder, task_name):
	name = glob.glob(user_folder + task_name + '*.png')
	print(name)
	return name

def get_animation_if_exist(user_folder):
	name = glob.glob(user_folder + 'animation.gif')
	return name

def cut_name_image(img_arr):
	res = []
	for img in img_arr:
		res.append(img.replace('/oct2py_server', ''))
	return res

@shared_task
def run_octave_script(pk, inp):
	task_id = str(run_octave_script.request.id)
	out = None
	images = None
	obj = ScriptCode.objects.get(pk=pk)
	user_folder = obj.get_user_folder()
	user_images_folder = user_folder + 'images/'
	
	result = {}

	# Run octave virtual env
	# addpath and run script
	with Oct2Py() as oc:
		oc.addpath(user_folder)
		oc.eval("cd " + user_folder)
		try:
			out = oc.feval(obj.get_file_name(),
				          *tuple(list(inp)), 
				          plot_dir	=	user_images_folder, 
				          plot_name	=	task_id,
				          timeout	=	SCRIPT_TIME,
				          nout		=	obj.output_number)
			# images = oc.extract_figures(user_folder + '/images/')
		except Oct2PyError as exc:
			print('Octave Error happened')
			result['state'] = 'FAILURE'
			result['message'] = 'Octave Error'
		except TypeError as exc:
			print('Type Error happened')
			result['state'] = 'FAILURE'
			result['message'] = 'Type Error'
		else:
			result['state'] = 'SUCCESS'
			result['message'] = out
	
	# Check if any image is generated and if is
	# add to the image_path so front can load it
	img_names = get_name_if_image_exist(user_images_folder, task_id)
	gif 	  = get_animation_if_exist(user_folder)
	if img_names:
		result['image_exist'] = 1
		result['image_path'] = cut_name_image(img_names)
	else:
		result['image_exist'] = 0
	
	if gif:
		result['gif'] = cut_name_image(gif)
	return result


@shared_task
def run_octave_script2(pk):
	out = None
	obj = ScriptCode.objects.get(pk=pk)
	user_folder = obj.get_user_folder()
	
	from oct2py import octave as oc
	import oct2py
	oc.addpath(user_folder)

	lst = tuple([2, 3])
	try:
		out = oc.feval(obj.get_file_name(), *lst, plot_dir=user_folder + '/images/', timeout=3)
	except oct2py.Oct2PyError:
		print('Octave Error happened')
		self.update_state(state='FAILED',
			meta={'message': 'Octave Error Happened'})
		oc.exit()
		oct2py.kill_octave()
		return None
	except TypeError:
		self.update_state(state='FAILED',
			meta={'message': 'type Error Happened'})
		oc.exit()
		oct2py.kill_octave()
		return None

	oc.exit()
	oct2py.kill_octave()

	result = {}
	result['somethings'] = 0
	result['out'] = out
	return result