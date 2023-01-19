
from django.urls import path

from form7.views import (
    Form7FormsView,
    Form7ToPdfView,
    Form7EFilingSubmitView,
)



urlpatterns = [
    
    path("form7/forms", Form7FormsView.as_view()),
    path("form7/forms/<str:pk>", Form7FormsView.as_view()),

    path("form7/form-print/<str:notice_of_urgent_application_id>/", Form7ToPdfView.as_view()),
    
    path("form7/efiling/<str:notice_of_urgent_application_id>/submit/", Form7EFilingSubmitView.as_view()),
   
]

