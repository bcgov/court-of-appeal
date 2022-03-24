import logging
import urllib

from rest_framework.request import Request
from django.conf import settings
from django.urls.exceptions import NoReverseMatch

from rest_framework.reverse import reverse

from form7.form7_cso_web_service.form7_csows_authorized_user_info import Form7AuthorizedUserInfo

from oidc_rp.models import OIDCUser

LOGGER = logging.getLogger(__name__)


def get_login_uri(request: Request = None, next: str = None) -> str:
    uri = None
    if request:
        query_dictionary = {"next": next, "kc_idp_hint": settings.OIDC_RP_KC_IDP_HINT}
        query_dictionary = {k: v for k, v in query_dictionary.items() if v is not None}
        try:
            uri = "{base_url}?{querystring}".format(
                base_url=reverse("oidc_auth_request", request=request),
                querystring=urllib.parse.urlencode(query_dictionary),
            )
        except NoReverseMatch:
            pass
    return uri


def get_logout_uri(request: Request = None) -> str:
    uri = None
    if request:
        try:
            uri = (
                settings.SITEMINDER_LOGOFF_URL
                + "?returl={end_session}&retnow=1".format(
                    end_session=reverse("oidc_end_session", request=request)
                )
            )
        except NoReverseMatch:
            pass
    return uri


def sync_keycloak_user(oidc_user: OIDCUser, claims: dict):
    """Copy attributes from JWT claims."""
    oidc_user.user.universal_id = claims.get("universal-id")
    oidc_user.user.authorization_id = claims.get("sub")
    oidc_user.user.first_name = claims.get("given_name") or ""
    oidc_user.user.last_name = claims.get("family_name") or ""
    oidc_user.user.display_name = claims.get("display_name") or ""
    oidc_user.user.email = claims.get("email")
    oidc_user.user.has_efiling_early_adopters = "/efiling-early-adopters" in claims.get("groups", {})
    oidc_user.user.save()    
    if (oidc_user.user.account_id is None or oidc_user.user.client_id is None):
        Form7AuthorizedUserInfo().get_authorized_user_info(claims.get("universal-id"), claims.get("sub"))

def get_efiling_streams(logged_in, request):
    return ""

def build_get_user_object(logged_in, request):
    return {
        "accepted_terms_at": logged_in and request.user.accepted_terms_at or None,
        "user_id": logged_in and request.user.authorization_id or None,
        "email": logged_in and request.user.email or None,
        "first_name": logged_in and request.user.first_name or None,
        "last_name": logged_in and request.user.last_name or None,
        "display_name": logged_in and request.user.display_name or None,
        "is_staff": logged_in and request.user.is_staff,
        "universal_id": logged_in and request.user.universal_id,
        "login_uri": get_login_uri(request),
        "logout_uri": get_logout_uri(request),
        "efiling_streams": get_efiling_streams(logged_in, request),
        "represented": logged_in and request.user.represented or None
    }
