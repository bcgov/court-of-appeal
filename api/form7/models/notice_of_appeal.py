import uuid
from django.db import models
from django.utils import timezone


class NoticeOfAppeal(models.Model):

    noticeOfAppealId = models.UUIDField(auto_created=True, primary_key=True, default=uuid.uuid4, editable=False, verbose_name="id")

    webCatsCaseNumber = models.CharField(max_length=50, null=True)
    
    ceisFileId = models.IntegerField(blank=True, null=True)
    
    accountId = models.IntegerField(null=True)

    lowerCourtFileNo = models.CharField(max_length=20, null=True)
    
    lowerCourtLevelCd = models.CharField(max_length=1, null=True)
    
    lowerCourtLevelName  = models.CharField(max_length=50, null=True, db_column="lowerCourtLevelName_Derived")
    
    lowerCourtRegistryId = models.DecimalField(max_digits=20, decimal_places=4, null=True)

    lowerCourtRegistryName = models.CharField(max_length=50, null=True, db_column="lowerCourtRegistryName_Derived")

    lowerCourtClassCd = models.CharField(max_length=1, null=True)
    
    lowerCourtClassName = models.CharField(max_length=50, null=True, db_column="lowerCourtClassName_Derived")
    
    lowerCourtStyleOfCause = models.CharField(max_length=500, null=True)

    nameOfJudge = models.CharField(max_length=100, null=True)

    honorificTitle = models.CharField(max_length=50, null=True)

    dateOfJudgement = models.DateTimeField(blank=True, null=True)

    appealSubmissionDeadline = models.DateTimeField(blank=True, null=True)
    
    trialDurationDays = models.IntegerField(blank=True, null=True)

    respondentSolicitor = models.CharField(max_length=255, null=True)

    appealingFirm = models.CharField(max_length=255, null=True)

    appealingFirmAddress = models.CharField(max_length=255, null=True)

    appealFrom = models.CharField(max_length=255, null=True)

    wasSupremeAppeal = models.BooleanField(blank=True, default=False, null=True)

    decisionMaker = models.CharField(max_length=100, null=True)

    partOfJudgment = models.CharField(max_length=100, null=True)

    refOptional = models.CharField(max_length=50, null=True)

    orderSought = models.CharField(max_length=50, null=True)

    protectionOrder = models.BooleanField(blank=True, default=False, null=True)

    toRespondents = models.CharField(max_length=50, null=True)

    lowerCourtInitiatingDocument = models.CharField(max_length=100, null=True)

    involves = models.CharField(max_length=100, null=True)

    readOnlyUsers = models.CharField(max_length=1000, null=True)

    readWriteUsers = models.CharField(max_length=1000, null=True)

    savedFromPage = models.CharField(max_length=10, null=True)

    handTypedNoSearch = models.BooleanField(blank=True, default=False, null=True)

    dateCreated = models.DateTimeField()

    createdByClientId = models.IntegerField(null=True)

    dateModified = models.DateTimeField()

    lastModifiedByClientId = models.IntegerField(null=True)

    dateSubmitted  = models.DateTimeField(blank=True, null=True)

    submittedByClientId = models.IntegerField(blank=True, null=True)

    submittedByFullName = models.CharField(max_length=100, null=True)

    electronicallyFiled = models.CharField(max_length=1, null=True)

    dateProcessed  = models.DateTimeField(blank=True, null=True)

    webCatsResultCode = models.CharField(max_length=50, null=True)

    selfRepresenting = models.BooleanField(blank=True, default=False, null=True)

    #public virtual ICollection<Party> Parties { get; set; }
    #public virtual ICollection<MSopParty> ManualSop { get; set; }

    def save(self, *args, **kwargs):
        
        if not self.dateCreated:
            self.dateCreated = timezone.now()
        self.dateModified = timezone.now()
        return super(NoticeOfAppeal, self).save(*args, **kwargs)
