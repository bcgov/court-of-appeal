
from django.urls import path

from form7.views import (
    CourtLocationsView, 
    Form7LookupView,
    Form7HolidaysListView,
    Form7AccountInfoView,
    Form7FileDetailView,
    Form7FileOrdersView,
    Form7FilePartiesView,
    Form7FormsView,
    Form7ToPdfView,
    Form7EFilingSubmitView
)



urlpatterns = [
    path("locations/",CourtLocationsView.as_view()),
    path("lookup/",Form7LookupView.as_view()),
    path("holidays/<int:year>/",Form7HolidaysListView.as_view()),
    path("account-info/",Form7AccountInfoView.as_view()),

    path("file-detail/",Form7FileDetailView.as_view()),
    path("file-detail/orders/<int:fileId>",Form7FileOrdersView.as_view()),
    path("file-detail/parties/<int:fileId>",Form7FilePartiesView.as_view()), 

    path("form7/forms", Form7FormsView.as_view()),
    path("form7/forms/<str:pk>", Form7FormsView.as_view()),

    path("form7/form-print/<str:notice_id>/", Form7ToPdfView.as_view()),

    path("form7/efiling/<str:notice_id>/submit/", Form7EFilingSubmitView.as_view()),
   
]

