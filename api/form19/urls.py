
from django.urls import path

from form19.views import (
  Form19FormsView,
  Form19ToPdfView,
  Form19EFilingSubmitView,
)



urlpatterns = [
   
    path("form19/forms", Form19FormsView.as_view()),
    path("form19/forms/<str:pk>", Form19FormsView.as_view()),

    path("form19/form-print/<str:withdraw_lawyer_id>/", Form19ToPdfView.as_view()),
    
    path("form19/efiling/<str:withdraw_lawyer_id>/submit/", Form19EFilingSubmitView.as_view()),
]

