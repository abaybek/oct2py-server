from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

import os
# Create your models here.
def user_directory_path(instance, filename):
	# file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'user_{0}/{1}'.format(instance.user.id, filename)

def validate_positive(value):
	if value < 0:
		raise ValidationError(
			_('%(value)s is not positive number'),
			params={'value': value},
		)


class ScriptCode(models.Model):
	user  			= models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	title 			= models.CharField(max_length=120, unique=True, null=False, blank=False)
	description 	= models.CharField(max_length=255, default='')
	timestamp 		= models.DateTimeField(auto_now_add=True)

	upload 			= models.FileField(upload_to=user_directory_path)
	input_number 	= models.IntegerField(default=1, validators=[validate_positive])
	output_number   = models.IntegerField(default=1, validators=[validate_positive])

	def __str__(self):
		return self.user.username + ' -> ' + self.title

	@property
	def owner(self):
		return self.user

	# Get url to download from server
	def get_file_url(self, request=None):
		file_url = None
		if request is not None:
			scheme = request.scheme
			base_url = scheme + '://'+ request.get_host()
			file_url = base_url + self.upload.url
		return file_url

	# Get path of the file on the system
	def get_file(self):
		return self.upload.path

	# Get users working folder
	def get_user_folder(self):
		folder = self.upload.path
		filename = os.path.basename(self.upload.name)
		folder = folder.replace(filename, '')
		return folder

	def get_file_name(self):
		return os.path.basename(self.upload.name)