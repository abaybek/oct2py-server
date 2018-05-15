from django.db.models import Q
from django.contrib.auth.models import AnonymousUser

from rest_framework import generics, mixins, views
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from scripts.models import ScriptCode
from .serializers import ScriptCodeSerializer
from .permissions import IsOwnerOrReadOnly, IsOwner

from scripts.tasks import fft_random, run_octave_script, run_octave_source

from celery.result import AsyncResult

class ScriptCodeAPIView(generics.ListAPIView):
	lookup_field 		 = 'pk'
	authentication_class = (JSONWebTokenAuthentication, )
	serializer_class 	 = ScriptCodeSerializer

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
	lookup_field 		 = 'pk'
	authentication_class = (JSONWebTokenAuthentication, )
	serializer_class 	 = ScriptCodeSerializer
	permission_classes 	 = (IsOwner, )

	def get_queryset(self):
		return ScriptCode.objects.all()

	def post(self, request, pk=None, format=None):
		# Get list of variables
		job = None

		inp = request.data.get('ivals', None)
		source_code = request.data.get('source', None)
		
		if inp:
			job = run_octave_script.delay(pk, inp)
		elif source_code:
			source_code=source_code.lstrip("'").lstrip('"')
			job = run_octave_source.delay(source_code)

		# job =fft_random.delay(100000)
		return Response(job.id, status=status.HTTP_200_OK)


class ScriptResultAPIView(views.APIView):
	authentication_class = (JSONWebTokenAuthentication, )
	permission_classes = (permissions.AllowAny, )
	
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


# class ScriptRunCodeAPIView(views.APIView):
# 	authentication_class = (JSONWebTokenAuthentication, )
#     def post(self, request, format=None):
#         code = request.data.get('code')
#         return code
#         # code = request.data.get('code')
#         # print(code)
#         # return Response(code, status=HTTP_200_OK)

class ScriptRunCodeAPIView(views.APIView):
    authentication_class = (JSONWebTokenAuthentication, )
    permission_classes = (permissions.AllowAny, )
    
    def post(self, request, format=None):
        user = request.user
        code = request.data.get('code')
        if code:
            job = run_octave_source.delay(code)
            return Response(job.id, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
