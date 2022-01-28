
from django.db import models

class PartyAlias(models.Model):

    partyAliasId = models.AutoField(auto_created=True, primary_key=True, serialize=False)

    name = models.CharField(max_length=100, null=True)
    
    nameType = models.CharField(max_length=50, null=True)

    # [JsonIgnore]
    # public int PartyId { get; set; }
    
    # [JsonIgnore] 
    # public virtual Party Party { get; set; }

    party = models.ForeignKey(
        "Party",
        related_name="aliases",
        on_delete=models.CASCADE
    )