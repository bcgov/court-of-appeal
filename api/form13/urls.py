
from django.urls import path

from form13.views import (
  Form13FormsView,
  Form13ToPdfView,
  Form13EFilingSubmitView,
)



urlpatterns = [
   
    path("form13/forms", Form13FormsView.as_view()),
    path("form13/forms/<str:pk>", Form13FormsView.as_view()),

    path("form13/form-print/<str:consent_extend_filing_time_id>/", Form13ToPdfView.as_view()),
    
    path("form13/efiling/<str:consent_extend_filing_time_id>/submit/", Form13EFilingSubmitView.as_view()),
]

