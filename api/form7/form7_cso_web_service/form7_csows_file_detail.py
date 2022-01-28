import logging

from django.utils import timezone
from datetime import date

from .form7_csows_caller_base import Form7CsowsCallerBase

logger = logging.getLogger(__name__)



class Form7FileDetail:


    def __init__(self):
        Form7CsowsCallerBase.__init__(self)


    def extract_court_class_and_number(self, file_number):
        court_class = None
        if len(file_number.strip())> 1:
            #string spaces, and hyphens from file numbers
            file_number = file_number.replace(" ", "").replace("-", "")

            if file_number[0].isalpha():            
                court_class = file_number[0].upper()
                file_number = file_number[1:]
        
        return court_class, file_number
                     

    def get_file_detail(self, court_level, location_id, file_number):

        court_class, court_file_number = self.extract_court_class_and_number(file_number)
        
        time_now = timezone.now()
        piFromDt = date(time_now.year-10, 1, 1)
        piToDt = date(time_now.year+5, 12, 31)
        
        piPage = 1
        exactMatchYn = True
        UserId = 1
        AppName = "FORM7"

        file_detail = self.client.service.fileNumberSearch(
            UserId,
            court_file_number,
            location_id,
            court_level,
            court_class,
            piFromDt,
            piToDt,
            piPage,
            exactMatchYn,
            AppName
        )

        return self.create_file_detail_response(file_detail)   


    def create_file_detail_response(self, detail):

        details = list()

        if ('result' in detail and 'array' in detail['result']):
            records = detail['result']['array']
            for record in records:

                if record['accessYn']== "Y":
                    details.append({
                        "fileId": int(record['physFileId']),
                        "fileNumber": record['courtFileNo'],
                        "styleOfCause": record['styleOfCause'],
                        "courtClass": record['courtClass'],
                        "courtClassCd": record['courtClassCd'],
                        "accessType": record['accessType']
                    })

        return details



    
    