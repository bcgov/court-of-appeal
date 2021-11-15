from django.db import models


class Case(models.Model):
    id = models.AutoField(
        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
    )
    type = models.CharField(max_length=100, default="", blank=True)
    status = models.CharField(max_length=100, default="", blank=True)    
    modified = models.DateTimeField(blank=True, null=True) 

    
    last_filed = models.DateTimeField(blank=True, null=True)
    submission_id = models.CharField(max_length=100, null=True)
    transaction_id = models.CharField(max_length=100, null=True)
    package_number = models.CharField(max_length=100, null=True)
    package_url = models.CharField(max_length=200, null=True)

    archive = models.BooleanField(blank=True, default=False, null=True)
    pdf_types = models.CharField(max_length=100, default="", blank=True)
    last_printed = models.DateTimeField(blank=True, null=True)
    description = models.CharField(max_length=200, default="", blank=True)
    
    # encryption key identifier
    key_id = models.CharField(max_length=32, blank=True, null=True)
    # stored encrypted when key_id is set
    data = models.BinaryField(blank=True, null=True)  

    user = models.ForeignKey(
        "User",
        related_name="app_user_Id",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )