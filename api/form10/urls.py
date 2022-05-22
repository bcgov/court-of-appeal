
from django.urls import path

from form10.views import (
  Form10FormsView,
  Form10ToPdfView,
  Form10EFilingSubmitView,
)



urlpatterns = [
   
    path("form10/forms", Form10FormsView.as_view()),
    path("form10/forms/<str:pk>", Form10FormsView.as_view()),

    path("form10/form-print/<str:order_of_single_justice_id>/", Form10ToPdfView.as_view()),
    
    path("form10/efiling/<str:order_of_single_justice_id>/submit/", Form10EFilingSubmitView.as_view()),
]

