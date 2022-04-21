
from django.urls import path

from form16.views import (
  Form16FormsView,
  Form16ToPdfView,
  Form16EFilingSubmitView,
)



urlpatterns = [
   
    path("form16/forms", Form16FormsView.as_view()),
    path("form16/forms/<str:pk>", Form16FormsView.as_view()),

    path("form16/form-print/<str:offer_to_settle_costs_id>/", Form16ToPdfView.as_view()),
    
    path("form16/efiling/<str:offer_to_settle_costs_id>/submit/", Form16EFilingSubmitView.as_view()),
]

