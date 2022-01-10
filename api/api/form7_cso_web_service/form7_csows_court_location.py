import logging

from django.utils import timezone
from datetime import timedelta

from api.utils import convert_full_address
from .form7_csows_caller_base import Form7CsowsCallerBase
from api.efiling.efiling_courts_address import EfilingCourtsAddress

from api.models import Location

logger = logging.getLogger(__name__)



class Form7CourtLocations:    

    def __init__(self):        
        Form7CsowsCallerBase.__init__(self)
        self.efiling_interface = EfilingCourtsAddress()

        
    def get_court_locations(self, addSupreme, addProvincial) -> {}: 

        updatingdate = timezone.now()+ timedelta(days=-1)
        loc = Location.objects.filter(last_updated__gte=updatingdate)

        # updates court location once a day
        if len(loc) ==0:
            print("______Updating_Locations_in_DB_______")
            self.update_court_locations_in_db()

        return self.query_locations(addSupreme, addProvincial)

    
    def update_court_locations_in_db(self):

        court_locations = self.client.service.getCourtLocations()  
        efiling_locations = self.efiling_interface.get_court_locations_address()
        
        for court_location in court_locations:

            court_type = ("","P")[court_location['isProvincialYn']=="Y"] + ("","S")[court_location['isSupremeYn']=="Y"]
            court_address=""
            court_city=""
            court_province=""
            court_postcode=""
            
            matched_efiling_location = [loc for loc in efiling_locations if (loc["short_description"]==court_location['agenAgencyIdentifierCd'])]
            if(len(matched_efiling_location) ==1):
                efiling_location= matched_efiling_location[0]                
                 
                court_address = convert_full_address(
                    efiling_location["address_line1"],
                    efiling_location["address_line2"],
                    efiling_location["address_line3"]
                )
                court_city = efiling_location["city"]
                court_province = efiling_location["province"]
                court_postcode = efiling_location["postal_code"]

            try:
                court_result = Location.objects.get(location_code=court_location['agenAgencyIdentifierCd'])
                court_result.name = court_location['agenAgencyNm']
                court_result.location_id = str(court_location['agenId'])
                court_result.type = court_type
                court_result.address = court_address
                court_result.city = court_city
                court_result.province = court_province
                court_result.postcode = court_postcode
                court_result.save()
            except:                       
                new_court_result = Location(
                    location_code = court_location['agenAgencyIdentifierCd'],
                    name = court_location['agenAgencyNm'],
                    location_id = str(court_location['agenId']),
                    type = court_type,
                    address = court_address,
                    city = court_city,
                    province = court_province,
                    postcode = court_postcode
                )
                new_court_result.save()
      
   
    def query_locations(self, addSupreme, addProvincial):
        db_locations = list(Location.objects.all())
        court_locations = list()
        for location in db_locations:  
            
            if location.location_id is None : continue 
            
            if ( (addSupreme==True and "S" in location.type)
                or (addProvincial==True and "P" in location.type)
                ):                
                court_locations.append({
                    "id": location.location_id,
                    "name": location.name,
                    "type": location.type,
                    "address": location.address,
                    "email": location.email,
                    "city": location.city,
                    "province": location.province,
                    "postalCode": location.postcode
                })            
        return court_locations