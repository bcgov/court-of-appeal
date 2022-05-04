
from django.urls import path

from form12.views import (
  Form12FormsView,
  Form12ToPdfView,
  Form12EFilingSubmitView,
)



urlpatterns = [
   
    path("form12/forms", Form12FormsView.as_view()),
    path("form12/forms/<str:pk>", Form12FormsView.as_view()),

    path("form12/form-print/<str:order_to_vary_order_of_justice_id>/", Form12ToPdfView.as_view()),
    
    path("form12/efiling/<str:order_to_vary_order_of_justice_id>/submit/", Form12EFilingSubmitView.as_view()),
]

