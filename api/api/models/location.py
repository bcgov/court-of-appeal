from django.db import models
from django.utils import timezone

class Location(models.Model):
    id = models.AutoField(
        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
    )
    created_date = models.DateTimeField(auto_now_add=True, null=True)
    last_updated = models.DateTimeField(auto_now=True, null=True)
    
    location_code = models.CharField(max_length=100, null=True)
    location_id = models.CharField(max_length=100, null=True)
    name = models.CharField(max_length=100, null=True)
    email = models.CharField(max_length=100, null=True)
    type = models.CharField(max_length=5, null=True)
    
    address = models.CharField(max_length=300, null=True)
    city = models.CharField(max_length=50, null=True)
    province = models.CharField(max_length=30, null=True)
    postcode = models.CharField(max_length=10, null=True)

    in_person_filing_location_code = models.CharField(max_length=100, null=True)
