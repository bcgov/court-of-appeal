from django.db import models


class Case(models.Model):
    id = models.AutoField(
        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
    )
    type = models.CharField(max_length=100, default="", blank=True)
    status = models.CharField(max_length=100, default="", blank=True)    
    modified = models.DateTimeField(blank=True, null=True)    
    package_url = models.CharField(max_length=200, null=True)

    data = models.JSONField(blank=True, null=True)

    package_number = models.CharField(max_length=100, null=True)

    version = models.CharField(max_length=32, blank=True, null=True)

    user = models.ForeignKey(
        "User",
        related_name="app_user_Id",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
