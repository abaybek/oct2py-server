from django.shortcuts import render

# Create your views here.



"""
 This views are the main page 
"""
from django.views.generic.base import TemplateView

# class MainAppView(TemplateView):
#     template_name = "scripts/app.html"

class MainAppView(TemplateView):
    template_name = "build/index.html"
