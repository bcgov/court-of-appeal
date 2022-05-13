
from django.urls import path

from form22.views import (
  Form22FormsView,
  Form22ToPdfView,
  Form22EFilingSubmitView,
)



urlpatterns = [
   
    path("form22/forms", Form22FormsView.as_view()),
    path("form22/forms/<str:pk>", Form22FormsView.as_view()),

    path("form22/form-print/<str:order_nofees_payable_id>/", Form22ToPdfView.as_view()),
    
    path("form22/efiling/<str:order_nofees_payable_id>/submit/", Form22EFilingSubmitView.as_view()),
]

