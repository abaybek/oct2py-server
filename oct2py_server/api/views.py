from django.shortcuts import render
from django.core.files import File
from django.http import HttpResponse
# HttpResponce


# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

import json
from oct2py import octave as oc
import oct2py
oc.addpath('./api/octave_apps/')


from .models import OctaveCode


from PIL import Image
import base64

class ExampleAPIView(APIView):
	"""
	List all snippets, or create a new snippet.
	"""
	def get_file_info(self, obj):
		response = {}
		response['name'] = obj.name
		response['path'] = obj.upload.name
		response['description'] = obj.description
		response['input_number'] = obj.input_number
		return response

	def get_all_files(self):
		objs = OctaveCode.objects.all()
		return [self.get_file_info(obj) for obj in objs]

	def get_filename(self, fname):
		obj = OctaveCode.objects.get(name=fname)
		info = self.get_file_info(obj)
		return info

	def get_real_filename(self, fname):
		obj = OctaveCode.objects.get(name=fname)
		return obj.upload.name

	def convert(v, t):
		stat = None
		if t == 'int': stat = int(v)
		elif t == 'float': stat = float(v)
		elif t == 'str': stat = str(v)
		return stat

	def get(self, request, fname='all', format=None):
		filename = None
		if fname == 'all':
			filename = self.get_all_files()
		else:
			filename = self.get_filename(fname) 

		return Response(filename)

	def get_images(self):
		mypath = './api/octave_apps/images/'
		from os import listdir
		from os.path import isfile, join
		onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
		return onlyfiles

	def get_base64_image(self, path):
		f = open(path, 'rb')
		image = File(f)
		data = base64.b64encode(image.read())
		f.close()
		return data

	def get_image_from_server(self, file):
		image = Image.open(file)
		response = HttpResponse(content_type='image/png')
		image.save(response, 'PNG')
		return response

	def post(self, request, fname='all', format=None):
		fname = self.get_real_filename(fname)

		res = {}

		lst = []
		d = request.data
		
		if len(d) <= 0:
			return Response('Pass')

		for v in d:
			lst.append(int(d[v]))

		lst = tuple(lst)
		
		out = None

		try:
			out = oc.feval(fname, *lst, plot_dir='./api/octave_apps/images/', timeout=3)
		except oct2py.Oct2PyError:
			print('Octave Error happened')

		res['result'] = out
		# for index, file in enumerate(self.get_images()):
		# 	res['file' + str(index)]  = self.get_base64_image('./api/octave_apps/images/' + str(file))

		isImage = 1
		if isImage:
			file = self.get_images()[0]
			return self.get_image_from_server('./api/octave_apps/images/' + str(file))

		return Response(res)



"""
 This views are the main page 
"""
from django.views.generic.base import TemplateView

class MainAppView(TemplateView):
    template_name = "api/app.html"