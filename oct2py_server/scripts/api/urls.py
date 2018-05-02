from django.conf.urls import url, include
from django.contrib import admin

from .views import (
    ScriptCodeRUDView, ScriptCodeAPIView, ScriptResultAPIView,
    ScriptRunCodeAPIView
)

urlpatterns = [
    url(r'^$', ScriptCodeAPIView.as_view(), name='script-listcreate'),
    url(r'^(?P<pk>\d+)/$', ScriptCodeRUDView.as_view(), name='script-rud'),
    url(r'^runscript/$', ScriptRunCodeAPIView.as_view(), name='script-run'),
    url(r'^result/$', ScriptResultAPIView.as_view(), name='script-results'),
]


from rest_framework.urlpatterns import format_suffix_patterns
urlpatterns += format_suffix_patterns(urlpatterns)