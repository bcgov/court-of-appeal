
from django.db import models

class PartyLegalRep(models.Model):

    partyLegalRepId = models.AutoField(auto_created=True, primary_key=True, serialize=False)

    name = models.CharField(max_length=100, null=True)
    
    repType = models.CharField(max_length=75, null=True)

    # [JsonIgnore]
    # public int PartyId { get; set; }
    
    # [JsonIgnore]
    # public virtual Party Party { get; set; }

    party = models.ForeignKey(
        "Party",
        related_name="legalReps",
        on_delete=models.CASCADE
    )