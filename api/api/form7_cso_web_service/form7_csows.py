import logging

from zeep import Client
from zeep.cache import InMemoryCache
from zeep.transports import Transport

from django.conf import settings

from requests import Session
from requests.auth import HTTPBasicAuth

logger = logging.getLogger(__name__)

class Form7Csows:    

    def __init__(self):
        session = Session()
        session.auth = HTTPBasicAuth(settings.COA_USERNAME, settings.COA_PASSWORD) 
     
        self.client = Client(
            settings.CSOWS_ENDPOINT,
            transport=Transport(cache=InMemoryCache(), session=session),
        )

    
    def get_court_locations(self, addSupreme, addProvincial) -> {}:       
        court_locations = self.client.service.getCourtLocations()        
        return self.filterLocations(court_locations, addSupreme, addProvincial)
        

    def filterLocations(self, locations, addSupreme, addProvincial):

        court_locations = list()
        for location in locations:
            if (addProvincial and location['isProvincialYn'] == "Y") or (addSupreme and location['isSupremeYn'] == "Y"):
                court_locations.append({"name":location['agenAgencyNm'], "id":location["agenId"], "type": ("","P")[location['isProvincialYn']=="Y"] + ("","S")[location['isSupremeYn']=="Y"]})                
        
        return court_locations
      
