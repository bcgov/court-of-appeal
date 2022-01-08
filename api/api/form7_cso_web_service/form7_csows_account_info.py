import logging

from api.utils import (convert_full_address , convert_full_name) 
from .form7_csows_extention_caller_base import Form7CsowsExtentionCallerBase

logger = logging.getLogger(__name__)



class Form7AccountInfo:    

    def __init__(self):
        Form7CsowsExtentionCallerBase.__init__(self)

        
    def get_account_info(self, account_id, client_id) -> {}: 

        account_info = self.client.service.getCsoClientProfiles(accountId=account_id)
        return self.create_response(account_info, account_id, client_id)


    def create_response(self, info, account_id, client_id):

        account = info['account']
        clients = info['client']
        
        accountUsers = list()
        for client in clients:
            accountUsers.append({
                "clientId": int(client['clientId']),
                "fullName": convert_full_name(client['givenName'],client['middleName'],client['surname']),
                "isAdmin": client['isAdmin']
            })
        
        province = account['province']
        if province is None:  province="BC"

        data = {         
            "accountId": account_id,
            "clientId": client_id,
            "name": account['accountName'],
            "address": convert_full_address(account['addressLine1'],account['addressLine2'],account['addressLine3']),
            "city":account['city'],
            "postcode":account['postalCode'],
            "province": province,
            "isFirm":len(clients)>1,
            "accountUsers": accountUsers        
        }

        return data



    
    