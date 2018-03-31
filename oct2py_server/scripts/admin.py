from django.contrib import admin

# Register your models here.

from .models import ScriptCode
# Register your models here.
admin.site.register(ScriptCode)


from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.conf import settings
import os, errno


# Get MEDIA ROOT folder if exists
MEDIA_FOLDER = getattr(settings, 'MEDIA_ROOT', './')

# Helper function checks 
def create_if_not_exist(folder):
	try:
		if not os.path.exists(folder):
			os.makedirs(folder)
	except OSError as e:
		if e.errno !=errno.EEXIST:
			raise

# creates folder where used whould be store his scripts
def create_folder(sender, instance, created, **kwargs):
	
	if not created:
		return
	
	user_folder = MEDIA_FOLDER + '/user_{0}'.format(instance.id)
	create_if_not_exist(user_folder)
	user_images_folder = user_folder + '/images'
	create_if_not_exist(user_images_folder)

post_save.connect(create_folder, sender=User)