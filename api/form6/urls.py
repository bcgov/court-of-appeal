
from django.urls import path

from form6.views import (
  Form6FormsView,
  Form6ToPdfView,
  Form6EFilingSubmitView,
)



urlpatterns = [
   
    path("form6/forms", Form6FormsView.as_view()),
    path("form6/forms/<str:pk>", Form6FormsView.as_view()),

    path("form6/form-print/<str:notice_id>/", Form6ToPdfView.as_view()),
    
    path("form6/efiling/<str:notice_id>/submit/", Form6EFilingSubmitView.as_view()),
]

