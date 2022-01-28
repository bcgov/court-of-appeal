from requests import Session
from requests.auth import HTTPBasicAuth

from django.conf import settings

from zeep import Client
from zeep.cache import InMemoryCache
from zeep.transports import Transport


class Form7CsowsCallerBase:    

    def __init__(self):
        session = Session()
        session.auth = HTTPBasicAuth(settings.CSOWS_USERNAME, settings.CSOWS_PASSWORD) 
     
        self.client = Client(
            settings.CSOWS_ENDPOINT,
            transport=Transport(cache=InMemoryCache(), session=session),
        )