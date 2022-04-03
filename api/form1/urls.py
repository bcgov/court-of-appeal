
from django.urls import path

from form1.views import (
  Form1FormsView,
  Form1ToPdfView,
  Form1EFilingSubmitView,
)



urlpatterns = [
   
    path("form1/forms", Form1FormsView.as_view()),
    path("form1/forms/<str:pk>", Form1FormsView.as_view()),

    path("form1/form-print/<str:notice_of_appeal_id>/", Form1ToPdfView.as_view()),
    
    path("form1/efiling/<str:notice_of_appeal_id>/submit/", Form1EFilingSubmitView.as_view()),
]

