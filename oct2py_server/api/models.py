from django.db import models

# Create your models here.


class OctaveCode(models.Model):
	"""docstring for OctaveCode"""
	name 			= models.CharField(max_length=255, unique=True)
	upload 			= models.FileField(upload_to='./api/octave_apps/')
	input_number 	= models.IntegerField()
	description 	= models.CharField(max_length=255, default='')

	def __str__(self):
		return self.name