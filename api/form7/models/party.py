
from django.db import models

class Party(models.Model):

    partyId = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="id")

    ceisPartyId= models.IntegerField(null=True)

    isOrganization = models.BooleanField(blank=True, default=False, null=True)

    prefix = models.CharField(max_length=100, null=True)

    firstGivenName = models.CharField(max_length=100, null=True)

    secondGivenName = models.CharField(max_length=100, null=True)

    thirdGivenName = models.CharField(max_length=100, null=True)

    surname = models.CharField(max_length=100, null=True)

    organizationName = models.CharField(max_length=100, null=True)

    counselName = models.CharField(max_length=255, null=True)

    appealRole = models.CharField(max_length=50, null=True)

    lowerCourtRole = models.CharField(max_length=255, null=True)

    # [JsonIgnore]
    # public Guid NoticeOfAppealId { get; set; }
    
    # [JsonIgnore]
    # [ScriptIgnore]
    # public virtual NoticeOfAppeal NoticeOfAppeal { get; set; }
    noticeOfAppeal = models.ForeignKey(
        "NoticeOfAppeal",
        related_name="parties",
        on_delete=models.CASCADE
    )

    # [DataMember(Order = 10)]
    # public virtual ICollection<PartyAlias> Aliases { get; set; }

    # [DataMember(Order = 10)]
    # public virtual ICollection<PartyLegalRep> LegalReps { get; set; }