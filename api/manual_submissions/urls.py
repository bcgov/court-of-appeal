
from django.urls import path

from manual_submissions.views import (
  ManualSubmissionFormsView,
  ManualSubmissionEFilingSubmitView,
)



urlpatterns = [
   
    path("manual-submissions/forms", ManualSubmissionFormsView.as_view()),    
    path("manual-submissions/efiling/<str:manual_submission_id>/submit/", ManualSubmissionEFilingSubmitView.as_view()),
]

