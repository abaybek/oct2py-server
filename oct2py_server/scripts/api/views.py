from django.db.models import Q
from django.contrib.auth.models import AnonymousUser

from rest_framework import generics, mixins, views
from rest_framework.response import Response
from rest_framework import status

from scripts.models import ScriptCode
from .serializers import ScriptCodeSerializer
from .permissions import IsOwnerOrReadOnly, IsOwner

from scripts.tasks import fft_random, run_octave_script

from celery.result import AsyncResult



class ScriptCodeAPIView(generics.ListAPIView):
	lookup_field = 'pk'
	serializer_class = ScriptCodeSerializer

	def get_queryset(self):
		qs = ScriptCode.objects.all()
		query = self.request.GET.get("q")
		if query is not None:
			qs = qs.filter(
				Q(title__icontains=query)|
				Q(description__icontains=query)
				).distinct()

		user = self.request.user

		if user is not None and not isinstance(user, AnonymousUser):
			qs = qs.filter(user=user)
		return qs


class ScriptCodeRUDView(generics.RetrieveDestroyAPIView):
	lookup_field = 'pk'
	serializer_class = ScriptCodeSerializer
	permission_classes = (IsOwner, )

	def get_queryset(self):
		return ScriptCode.objects.all()

	def post(self, request, pk, format=None):
		# Get list of variables

		# inp = None
		# if request.data['ivals']:
		# 	inp = request.data['ivals']

		# job = run_octave_script.delay(pk, inp)
		job =fft_random.delay(100000)
		return Response(job.id, status=status.HTTP_200_OK)


class ScriptResultAPIView(views.APIView):

	def get(self, request, format=None):
		if 'job' in request.GET:
			job_id = request.GET['job']
			job = AsyncResult(job_id)
			
			context = {
				'job_result':job.result,
				'job_state' : job.state,
				'task_id':job_id,
			}
			return Response(context, status=status.HTTP_200_OK)
		else:
			return Response(status=status.HTTP_200_OK)
