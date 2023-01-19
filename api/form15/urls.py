
from django.urls import path

from form15.views import (
  Form15FormsView,
  Form15ToPdfView,
  Form15EFilingSubmitView,
)



urlpatterns = [
   
    path("form15/forms", Form15FormsView.as_view()),
    path("form15/forms/<str:pk>", Form15FormsView.as_view()),

    path("form15/form-print/<str:consent_order_general_id>/", Form15ToPdfView.as_view()),
    
    path("form15/efiling/<str:consent_order_general_id>/submit/", Form15EFilingSubmitView.as_view()),
]

