
from django.urls import path

from csows.views import (
    FormSearchView,
    CourtLocationsView, 
    LookupView,
    HolidaysListView,
    AccountInfoView,
    FileDetailView,
    FileOrdersView,
    FilePartiesView,
    DocumentTypesView
)



urlpatterns = [

    path("form7s/", FormSearchView.as_view()),

    path("locations/",CourtLocationsView.as_view()),
    path("document-types/", DocumentTypesView.as_view()),
    path("lookup/",LookupView.as_view()),
    path("holidays/<int:year>/",HolidaysListView.as_view()),
    path("account-info/",AccountInfoView.as_view()),

    path("file-detail/",FileDetailView.as_view()),
    path("file-detail/orders/<int:fileId>",FileOrdersView.as_view()),
    path("file-detail/parties/<int:fileId>",FilePartiesView.as_view()), 
]

