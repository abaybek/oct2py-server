from django.conf.urls import url
from django.contrib import admin
from .views import MainAppView

urlpatterns = [
	url(r'^$', MainAppView.as_view()), 
]