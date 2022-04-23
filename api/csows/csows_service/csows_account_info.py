import logging

from csows.utils import (convert_full_address , convert_full_name) 
from .csows_extention_caller_base import CsowsExtentionCallerBase
from .csows_authorized_user_info import AuthorizedUserInfo

logger = logging.getLogger(__name__)



class AccountInfo:    

    def __init__(self):
        CsowsExtentionCallerBase.__init__(self)

        
    def get_account_info(self, account_id, client_id, user) -> {}: 

        account_info = self.client.service.getCsoClientProfiles(accountId=account_id)
        
        if 'account' not in  account_info or account_info['account'] is None:
            auth_user = AuthorizedUserInfo()
            auth_user.get_authorized_user_info(user.universal_id, user.authorization_id)
            account_info = self.client.service.getCsoClientProfiles(accountId=auth_user.account_id)
            print(account_info)

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

        if account:
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
        else:
            data = {         
                "accountId": account_id,
                "clientId": client_id,
                "name": None,
                "address": None,
                "city":None,
                "postcode":None,
                "province": None,
                "isFirm":len(clients)>1,
                "accountUsers": accountUsers
            }

        return data



    
    