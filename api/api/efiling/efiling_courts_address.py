from django.conf import settings
import json
import requests
from django.http import (HttpResponseBadRequest)
import logging
logger = logging.getLogger(__name__)

from .efiling_hub_caller_base import EFilingHubCallerBase


class EfilingCourtsAddress(EFilingHubCallerBase):

    def __init__(self):
        self.access_token = None
        self.court_level = settings.EFILING_COURT_LEVEL
        self.court_class = settings.EFILING_COURT_CLASS       
        EFilingHubCallerBase.__init__(self)

    def get_court_locations_address(self) -> {}:        
        
        url = f"{self.api_base_url}/courts"#?courtLevel=S"
        response = self._get_api(url, headers={})

        if response.status_code == 200:
            cso_locations = json.loads(response.text)
            locations = list()

            for location in cso_locations["courts"]:
                
                # {'id': 9067.0001, 'identifierCode': '1031', 'name': 'Campbell River Court', 'code': 'CAR', 'isSupremeCourt': True, 'address': {'addressLine1': '500 13th Ave.', 'addressLine2': None, 'addressLine3': None, 'postalCode': None, 'cityName': 'Campbell River', 'provinceName': 'British Columbia', 'countryName': 'Canada'}}
                # print(location)
                locations.append({
                    "name": location["name"],
                    "address_line1": location["address"]["addressLine1"],
                    "address_line2": location["address"]["addressLine2"],
                    "address_line3": location["address"]["addressLine3"],
                    "postal_code": location["address"]["postalCode"],
                    "city": location["address"]["cityName"],
                    "province": location["address"]["provinceName"],                    
                    "location_code": location["id"],
                    "short_description": location["identifierCode"],
                })

            return locations
        else:
            return None

    def _get_api(self, url, headers):
        if not self.access_token and not self._get_token():
            return HttpResponseBadRequest(f"EFH - Unable to get API Token")

        for try_number in range(1):
            if try_number > 0:
                self._get_token()
            headers = self._set_headers(headers)
            response = requests.get(url, headers=headers)
            # logger.debug(
            #     "EFHResources - Get API %d %s", response.status_code, response.text
            # )
            if response.status_code != 401:
                break
        return response
    
    def get_document_types(self):
        query_string = (
            f"?courtLevel={self.court_level}&courtClassification={self.court_class}"
        )
        url = f"{self.api_base_url}/documents/types{query_string}"
        response = self._get_api(url, headers={})
        if response.status_code == 200:
            return response.json()
        logger.error("Error getting document types.")
        return None