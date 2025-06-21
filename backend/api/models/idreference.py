from django.db import models

class IDReference(models.Model):
    sss_no = models.CharField(max_length=50)
    gsis_no = models.CharField(max_length=50)
    pagibig_no = models.CharField(max_length=50)
    psn_no = models.CharField(max_length=50)
    philhealth_no = models.CharField(max_length=50)
    other_id = models.CharField(max_length=100)
    other_id_no = models.CharField(max_length=50)