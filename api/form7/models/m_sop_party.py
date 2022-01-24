import uuid
from django.db import models



class MSopParty(models.Model):
    
    mSopPartyId = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="id")

    # [JsonIgnore]
    # public Guid NoticeOfAppealId { get; set; }

    # [JsonIgnore]
    # [ScriptIgnore]
    # public virtual NoticeOfAppeal NoticeOfAppeal { get; set; }
    noticeOfAppeal = models.ForeignKey(
        "NoticeOfAppeal",
        related_name="manualSop",
        on_delete=models.CASCADE
    )

    appealRole = models.CharField(max_length=50, null=True)

    lowerCourtRole = models.CharField(max_length=255, null=True)

    conjunction = models.CharField(max_length=255, null=True)

    partyName = models.CharField(max_length=4000, null=True)

    plural = models.BooleanField(blank=True, default=False, null=True)