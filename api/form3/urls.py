
from django.urls import path

from form3.views import (
  Form3FormsView,
  Form3ToPdfView,
  Form3EFilingSubmitView,
)



urlpatterns = [
   
    path("form3/forms", Form3FormsView.as_view()),
    path("form3/forms/<str:pk>", Form3FormsView.as_view()),

    path("form3/form-print/<str:notice_of_cross_appeal_id>/", Form3ToPdfView.as_view()),
    
    path("form3/efiling/<str:notice_of_cross_appeal_id>/submit/", Form3EFilingSubmitView.as_view()),
]

