from django.db import models


class FormPdf(models.Model):
    id = models.AutoField(
        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
    )
    created_date = models.DateTimeField(auto_now_add=True)
    # stored encrypted when key_id is set
    data = models.BinaryField(blank=True, null=True)
    json_data = models.BinaryField(blank=True, null=True)

    # encryption key identifier
    key_id = models.CharField(max_length=32, blank=True, null=True)
    pdf_type = models.CharField(max_length=32, blank=True, null=True)
    version = models.CharField(max_length=32, blank=True, null=True)

    consent_extend_filing_time = models.ForeignKey(
        "ConsentExtendFilingTime",
        related_name="consent_extend_filing_time_form_pdf",
        on_delete=models.CASCADE
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['consent_extend_filing_time_id', 'pdf_type'], name='unique_pdf_type_consent_extend_filing_time_id'),
        ]
