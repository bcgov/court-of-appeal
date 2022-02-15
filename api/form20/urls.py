
from django.urls import path

from form20.views import (
  Form20FormsView,
  Form20ToPdfView,
  Form20EFilingSubmitView,
)



urlpatterns = [
   
    path("form20/forms", Form20FormsView.as_view()),
    path("form20/forms/<str:pk>", Form20FormsView.as_view()),

    path("form20/form-print/<str:objection_withdraw_id>/", Form20ToPdfView.as_view()),
    
    path("form20/efiling/<str:objection_withdraw_id>/submit/", Form20EFilingSubmitView.as_view()),
]

