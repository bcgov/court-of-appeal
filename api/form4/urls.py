
from django.urls import path

from form4.views import (
  Form4FormsView,
  Form4ToPdfView,
  Form4EFilingSubmitView,
)



urlpatterns = [
   
    path("form4/forms", Form4FormsView.as_view()),
    path("form4/forms/<str:pk>", Form4FormsView.as_view()),

    path("form4/form-print/<str:notice_of_application_id>/", Form4ToPdfView.as_view()),
    
    path("form4/efiling/<str:notice_of_application_id>/submit/", Form4EFilingSubmitView.as_view()),
]

