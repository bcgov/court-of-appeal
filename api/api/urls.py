"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

import os
import logging
import sys
from django.urls import path, include
from django.conf import settings
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.schemas import SchemaGenerator
from rest_framework.views import APIView
from rest_framework_swagger import renderers
from django.contrib import admin
from django.urls import path


from api.views import (
    CaseView,
    UserView,
    JourneyMapView,
    FormToPdfView,
    Form7SearchView,
    EFilingSubmitView   
)


class SwaggerSchemaView(APIView):
    permission_classes = [AllowAny]
    renderer_classes = [renderers.OpenAPIRenderer, renderers.SwaggerUIRenderer]
    _ignore_model_permissions = True
    exclude_from_schema = True

    def get(self, request):
        generator = SchemaGenerator()
        schema = generator.get_schema(request=request)
        return Response(schema)


urlpatterns = [
    # Swagger documentation
    # url(r'^$', SwaggerSchemaView.as_view()),
    #url(r"^accept-terms$", AcceptTermsView.as_view()),
    path("case/<int:pk>/", CaseView.as_view()),
    path("journey/", JourneyMapView.as_view()),
    path("case/", CaseView.as_view()),
    path("form-print/<int:case_id>/", FormToPdfView.as_view()),
    path("user-info/", UserView.as_view()),
    path("form7s/", Form7SearchView.as_view()),
    #path("efiling/document-types/", EFilingDocumentTypesView.as_view()),
    #path("efiling/locations/", EFilingLocationView.as_view()),
    path("efiling/<int:case_id>/submit/", EFilingSubmitView.as_view()),
]

if settings.OIDC_ENABLED:
    urlpatterns.append(path("oidc/", include("oidc_rp.urls")))

"""
Usually in our Docker/Production environment the API server and the WEB server
are both on port 8080. If they are on the same port the "?next=" querystring for login
redirect will work correctly, otherwise OIDC_RP_AUTHENTICATION_REDIRECT_URI needs to
be set. EX. OIDC_RP_AUTHENTICATION_REDIRECT_URI = 
http://localhost:8080/choose-how-to-attend-your-traffic-hearing/admin
"""
LOGGER = logging.getLogger(__name__)
RUNNING_DEVSERVER = len(sys.argv) > 1 and sys.argv[1] == "runserver"
if (
    RUNNING_DEVSERVER
    and sys.argv[2] != "8080"
    and (
        os.getenv("OIDC_RP_AUTHENTICATION_REDIRECT_URI", "/") == "/"
        or os.getenv("OIDC_RP_AUTHENTICATION_FAILURE_REDIRECT_URI", "/") == "/"
    )
):
    LOGGER.warning(
        "DEVSERVER not matching webserver on port 8080 - Ensure "
        "OIDC_RP_AUTHENTICATION_REDIRECT_URI && "
        "OIDC_RP_AUTHENTICATION_FAILURE_REDIRECT_URI "
        "environment variables are set or login will only redirect to API."
    )