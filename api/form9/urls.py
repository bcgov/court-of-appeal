
from django.urls import path

from form9.views import (
  Form9FormsView,
  Form9ToPdfView,
  Form9EFilingSubmitView,
)



urlpatterns = [
   
    path("form9/forms", Form9FormsView.as_view()),
    path("form9/forms/<str:pk>", Form9FormsView.as_view()),

    path("form9/form-print/<str:requisition_id>/", Form9ToPdfView.as_view()),
    
    path("form9/efiling/<str:requisition_id>/submit/", Form9EFilingSubmitView.as_view()),
]

