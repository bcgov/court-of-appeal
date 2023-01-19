from django.db import models


class Journeymap(models.Model):
    id = models.AutoField(
        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
    )
    
    # encryption key identifier
    key_id = models.CharField(max_length=32, blank=True, null=True)
    # stored encrypted when key_id is set
    steps = models.BinaryField(blank=True, null=True)    

    version = models.CharField(max_length=32, blank=True, null=True)

    user = models.ForeignKey(
        "User",
        related_name="journey_user_Id",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
