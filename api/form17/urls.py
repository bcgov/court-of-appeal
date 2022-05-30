
from django.urls import path

from form17.views import (
  Form17FormsView,
  Form17ToPdfView,
  Form17EFilingSubmitView,
)



urlpatterns = [
   
    path("form17/forms", Form17FormsView.as_view()),
    path("form17/forms/<str:pk>", Form17FormsView.as_view()),

    path("form17/form-print/<str:certificate_of_costs_id>/", Form17ToPdfView.as_view()),
    
    path("form17/efiling/<str:certificate_of_costs_id>/submit/", Form17EFilingSubmitView.as_view()),
]

