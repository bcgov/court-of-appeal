from requests import Session
from requests.auth import HTTPBasicAuth

from django.conf import settings

from zeep import Client
from zeep.cache import InMemoryCache
from zeep.transports import Transport


class FormSearchCallerBase:    

    def __init__(self):
        session = Session()
        session.auth = HTTPBasicAuth(settings.COA_USERNAME, settings.COA_PASSWORD)
        self.client = Client(
            settings.COA_SEARCH_ENDPOINT,
            transport=Transport(cache=InMemoryCache(), session=session),
        )
