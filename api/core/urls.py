"""
Definition of urls for the application.
"""
import os

from django.conf.urls import include
from django.urls import path
from django.views.generic import RedirectView
from . import views

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = [
    path("", RedirectView.as_view(url="api/v1/user-info/"), name=""),
    path("health/", views.health),
    path("api/v1/logout/", views.logout)
]

if (os.getenv('DJANGO_SETTINGS_MODULE') == "api.settings"):
    urlpatterns.append(path("api/v1/", include("api.urls")))
    urlpatterns.append(path("api/v1/", include("form7.urls")))
    urlpatterns.append(path("api/v1/", include("form5.urls")))
    urlpatterns.append(path("api/v1/", include("form6.urls")))
    urlpatterns.append(path("api/v1/", include("form9.urls")))
    
    urlpatterns.append(path("api/v1/", include("form18.urls")))
    urlpatterns.append(path("api/v1/", include("form19.urls")))
    urlpatterns.append(path("api/v1/", include("form20.urls")))
    urlpatterns.append(path("api/v1/", include("form1.urls")))
    urlpatterns.append(path("api/v1/", include("form3.urls")))