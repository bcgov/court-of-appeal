
from django.urls import path

from form8.views import (
  Form8FormsView,
  Form8ToPdfView,
  Form8EFilingSubmitView,
)



urlpatterns = [
   
    path("form8/forms", Form8FormsView.as_view()),
    path("form8/forms/<str:pk>", Form8FormsView.as_view()),

    path("form8/form-print/<str:notice_of_application_to_vary_order_id>/", Form8ToPdfView.as_view()),
    
    path("form8/efiling/<str:notice_of_application_to_vary_order_id>/submit/", Form8EFilingSubmitView.as_view()),
]

