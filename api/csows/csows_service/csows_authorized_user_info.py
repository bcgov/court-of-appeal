import logging

from api.models import User
from .csows_extention_caller_base import CsowsExtentionCallerBase

logger = logging.getLogger(__name__)



class AuthorizedUserInfo:


    def __init__(self):
        CsowsExtentionCallerBase.__init__(self)
        self.account_id=None
        self.client_id=None

        
    def get_authorized_user_info(self, u_id, auth_id):

        try:
            user = User.objects.get(universal_id=u_id, authorization_id=auth_id)           

            info = self.client.service.isAuthorizedUser(u_id)
            self.account_id=info['accountId']
            self.client_id=info['clientId']
            user.account_id=info['accountId']
            user.client_id=info['clientId']
            user.save()

        except Exception as ex:
            logger.error("ERROR: updating account_id and client_id %s", ex)


    
    