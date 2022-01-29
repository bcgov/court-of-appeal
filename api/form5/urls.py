
from django.urls import path

from form5.views import (
  Form5FormsView,
  Form5ToPdfView
)



urlpatterns = [
   
    path("form5/forms", Form5FormsView.as_view()),
    path("form5/forms/<str:pk>", Form5FormsView.as_view()),

    path("form5/form-print/<str:notice_id>/", Form5ToPdfView.as_view()),
   
]

