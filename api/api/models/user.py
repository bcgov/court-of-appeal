from django.db import models
from core.models import UserBase


class User(UserBase):
    location = models.CharField(max_length=500, blank=True, null=True)
    account_id = models.IntegerField(null=True)
    client_id = models.IntegerField(null=True)
    represented = models.BooleanField(blank=True, null=True)
