import logging
import requests

import settings
import json

from email.header import Header
from email.utils import formataddr
from requests.auth import HTTPBasicAuth

logger = logging.getLogger(__name__)


class ChesEmail:
    def __init__(self):
        client_id = settings.EMAIL_SERVICE_CLIENT_ID
        client_secret = settings.EMAIL_SERVICE_CLIENT_SECRET
        auth_url = settings.CHES_AUTH_URL
        sender_email = settings.SENDER_EMAIL
        sender_name = settings.SENDER_NAME
        email_url = settings.CHES_EMAIL_URL

        if not client_id:
            logger.error("Email service client id is not configured")
        if not client_secret:
            logger.error("Email service client secret is not configured")
        if not auth_url:
            logger.error(
                "Common hosted email service authentication url is not configured"
            )
        if not sender_email:
            logger.error("Sender email address not configured")
        if not email_url:
            logger.error("CHES email url not configured")
        if not sender_name:
            logger.error("Sender name not configured")

    def _get_email_service_token(self) -> {}:
        try:
            token_rs = requests.post(
                self.auth_url,
                data={"grant_type": "client_credentials"},
                auth=HTTPBasicAuth(self.client_id, self.client_secret),
                headers={"content-type": "application/x-www-form-urlencoded"},
                verify=True,
            )
            if not token_rs.status_code == 200:
                logger.error("Error: Unexpected response", token_rs.text.encode("utf8"))
                return
            json_obj = token_rs.json()
            return json_obj
        except requests.exceptions.RequestException as e:
            logger.error("Error: {}".format(e))
            return

    def send_email(
        self,
        body: any,
        bodyType: str,
        subject: str,
        recipient_email: str,
        attachment: any,
    ) -> {}:

        if not recipient_email:
            logger.error("No recipient email address provided")
            return
        if not body:
            logger.error("No email body provided")
            return
        token = self._get_email_service_token()
        if not token or "access_token" not in token:
            logger.error("No email service token provided", token)
            return
        auth_token = token["access_token"]

        sender_info = formataddr(
            (str(Header(self.sender_name, "utf-8")), self.sender_email)
        )
        recipients = recipient_email.split(",")
        attachments = [attachment] if attachment else []

        data = {
            "bcc": [],
            "bodyType": bodyType,
            "body": body,
            "cc": [],
            "delayTS": 0,
            "encoding": "utf-8",
            "from": sender_info,
            "priority": "normal",
            "subject": subject,
            "to": recipients,
            "tag": "email_1",
            "attachments": attachments,
        }

        headers = {
            "Authorization": "Bearer " + auth_token,
            "Content-Type": "application/json",
        }
        try:
            response = requests.post(
                self.email_url, data=json.dumps(data), headers=headers
            )
            if not response.status_code // 100 == 2:
                logger.error("Error: Email failed!", response.text.encode("utf8"))
                return

            email_res = response.json()
            logger.debug("Email sent successfully!", email_res)
            return email_res
        except requests.exceptions.RequestException as e:
            logger.error("Error: {}".format(e))
            return
