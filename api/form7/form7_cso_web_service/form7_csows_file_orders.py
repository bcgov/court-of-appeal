import logging

from datetime import timedelta
from django.utils import timezone

from form7.form7_cso_web_service.library.due_dates import DueDates

from .form7_csows_caller_base import Form7CsowsCallerBase

logger = logging.getLogger(__name__)



class Form7FileOrders:


    def __init__(self):
        Form7CsowsCallerBase.__init__(self)
             

    def get_file_orders(self, file_id, account_id, client_id):
                
        UserId = 1
        SearchId = 0

        order_detail = self.client.service.getOrderDetails(
            UserId, 
            SearchId, 
            file_id, 
            account_id, 
            client_id            
        )

        court_class_code = self.get_court_class(file_id, account_id, client_id)

        return self.create_file_orders_response(order_detail, court_class_code)   

    
    def get_court_class(self, file_id, account_id, client_id):
                
        UserId = 1
        SearchId = 0

        case_base_detail = self.client.service.viewCaseBasics(
            UserId, 
            SearchId, 
            file_id, 
            account_id, 
            client_id            
        )

        return case_base_detail['courtClassCd']


    def create_file_orders_response(self, orders, court_class_code):

        details = list()

        for order in orders:
            appearance_days = 0
            if order['appearanceDays'] is not None: 
                appearance_days = int(order['appearanceDays'])
            appeal_submission_deadline = DueDates().GetDateDue(order.orderGrantedDt, court_class_code) 
            details.append({
                "documentId": int(order['documentId']),
                "documentTypeCode": order['documentTypeCd'],
                "documentType": order['documentTypeDsc'],
                "orderDate": order['orderGrantedDt'],
                "honorificTitle": order['honorificDsc'],
                "judgeFirstName": order['givenNm'],
                "judgeSurname": order['surnameNm'],
                "appearanceDays": appearance_days,
                "appealSubmissionDeadline": appeal_submission_deadline,
                "isPastDeadline": self.is_inthe_past(appeal_submission_deadline)
            })

        return details


    def is_inthe_past(self, date):    
        if date is not None and timezone.now()>date:
            return True
        else:
            return False
        
        



    
    