
from django.urls import path

from form14.views import (
  Form14FormsView,
  Form14ToPdfView,
  Form14EFilingSubmitView,
)



urlpatterns = [
   
    path("form14/forms", Form14FormsView.as_view()),
    path("form14/forms/<str:pk>", Form14FormsView.as_view()),

    path("form14/form-print/<str:consent_remove_inactive_appeal_id>/", Form14ToPdfView.as_view()),
    
    path("form14/efiling/<str:consent_remove_inactive_appeal_id>/submit/", Form14EFilingSubmitView.as_view()),
]

