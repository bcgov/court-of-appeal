# Special thanks to eDivorce for this.
import json
import logging
import requests
import settings
from requests.auth import HTTPBasicAuth

logger = logging.getLogger(__name__)


class EFilingHubCallerBase:

    def __init__(self):
        self.client_id = settings.EFILING_HUB_KEYCLOAK_CLIENT_ID
        self.client_secret = settings.EFILING_HUB_KEYCLOAK_SECRET
        self.token_base_url = settings.EFILING_HUB_KEYCLOAK_BASE_URL
        self.token_realm = settings.EFILING_HUB_KEYCLOAK_REALM
        self.api_base_url = settings.EFILING_HUB_API_BASE_URL
        self.access_token = None
        self.refresh_token = None

    def _token_url(self):
        return f'{self.token_base_url}/auth/realms/{self.token_realm}/protocol/openid-connect/token'

    def _get_token(self):
        headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        payload = {'grant_type': 'client_credentials'}
        auth = HTTPBasicAuth(self.client_id, self.client_secret)

        response = requests.post(self._token_url(), headers=headers, data=payload, auth=auth)
        logger.debug('EFH - Get Token %d', response.status_code)
        if response.status_code == 200:
            response = json.loads(response.text)
            if 'access_token' in response:
                self.access_token = response['access_token']
                if 'refresh_token' in response:
                    self.refresh_token = response['refresh_token']
                return True
        return False

    def _refresh_token(self):
        if not self.refresh_token:
            return False

        headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        payload = {'grant_type': 'refresh_token', 'refresh_token': self.refresh_token}
        auth = HTTPBasicAuth(self.client_id, self.client_secret)

        response = requests.post(self._token_url(), headers=headers, data=payload, auth=auth)
        logger.debug('EFH - Get Refresh Token %d', response.status_code)
        response = json.loads(response.text)
        if 'access_token' in response:
            self.access_token = response['access_token']
            if 'refresh_token' in response:
                self.refresh_token = response['refresh_token']
            return True
        return False

    def _set_headers(self, headers, bceid_guid=None, transaction_id=None):
        headers.update({
            'Authorization': f'Bearer {self.access_token}'
        })
        if transaction_id:
            headers.update({
                'X-User-Id': bceid_guid,
                'X-Transaction-Id': transaction_id
            })
        return headers
