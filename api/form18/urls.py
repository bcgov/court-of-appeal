
from django.urls import path

from form18.views import (
  Form18FormsView,
  Form18ToPdfView,
  Form18EFilingSubmitView,
)



urlpatterns = [
   
    path("form18/forms", Form18FormsView.as_view()),
    path("form18/forms/<str:pk>", Form18FormsView.as_view()),

    path("form18/form-print/<str:change_of_address_id>/", Form18ToPdfView.as_view()),
    
    path("form18/efiling/<str:change_of_address_id>/submit/", Form18EFilingSubmitView.as_view()),
]

