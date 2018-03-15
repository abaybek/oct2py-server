from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

import json
from oct2py import octave as oc
oc.addpath('./api/octave_apps/')


from .models import OctaveCode

class ExampleAPIView(APIView):
	"""
	List all snippets, or create a new snippet.
	"""
	def get_all_files(self):
		objs = OctaveCode.objects.all()
		return [obj.name for obj in objs]

	def get_filename(self, fname):
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
		print(fname)
		if fname == 'all':
			filename = self.get_all_files()
		else:
			filename = self.get_filename(fname) 

		return Response(filename)

	def post(self, request, fname='all', format=None):
		fname = self.get_filename(fname)

		res = {}

		lst = []
		d = request.data
		
		if len(d) <= 0:
			return Response('Pass')

		for v in d:
			lst.append(int(d[v]))

		lst = tuple(lst)

		out = oc.feval(fname, *lst)
		res['result'] = out
		return Response(res)
