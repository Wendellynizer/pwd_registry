from django.db import models

from . import Applicant

class IDReference(models.Model):

    applicant = models.OneToOneField(
        Applicant,
        on_delete=models.CASCADE
    )

    sss_no = models.CharField(max_length=50, null=True, blank=True)
    gsis_no = models.CharField(max_length=50, null=True, blank=True)
    pagibig_no = models.CharField(max_length=50, null=True, blank=True)
    psn_no = models.CharField(max_length=50, null=True, blank=True)
    philhealth_no = models.CharField(max_length=50, null=True, blank=True)
    other_id = models.CharField(max_length=100, null=True, blank=True)
    other_id_no = models.CharField(max_length=50, null=True, blank=True)