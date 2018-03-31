# Create your tasks here
from __future__ import absolute_import, unicode_literals
from celery import shared_task, current_task
from celery.exceptions import Ignore, Reject

from scipy.fftpack import fft
from numpy import random

from scripts.models import ScriptCode

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

@shared_task
def run_octave_script(pk, inp):
	task_id = str(run_octave_script.request.id)
	out = None
	images = None
	obj = ScriptCode.objects.get(pk=pk)
	user_folder = obj.get_user_folder()
	
	result = {}

	with Oct2Py() as oc:
		oc.addpath(user_folder)
		try:
			out = oc.feval(obj.get_file_name(),
				          *tuple(list(inp)), 
				          plot_dir=user_folder + '/images/', 
				          plot_name=str(task_id),
				          timeout=3,
				          nout=obj.output_number)
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