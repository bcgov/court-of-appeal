
from django.urls import path

from form11.views import (
  Form11FormsView,
  Form11ToPdfView,
  Form11EFilingSubmitView,
)



urlpatterns = [
   
    path("form11/forms", Form11FormsView.as_view()),
    path("form11/forms/<str:pk>", Form11FormsView.as_view()),

    path("form11/form-print/<str:order_of_three_justices_id>/", Form11ToPdfView.as_view()),
    
    path("form11/efiling/<str:order_of_three_justices_id>/submit/", Form11EFilingSubmitView.as_view()),
]

