from django.contrib import admin
from django.db import models

from .application import Applicant

#* type
class DisabilityType(models.Model):
    disability_type_name = models.CharField(max_length=50)

    def __str__(self):
        return self.disability_type_name
    
#* disability
class Disability(models.Model):
    disability_name = models.CharField(max_length=250)
    disability_type = models.ForeignKey(
        DisabilityType, 
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.disability_name
    
#* applicant disability
class ApplicantDisability(models.Model):
    disability_cause = models.CharField(
        max_length=30,
        choices=[
            ("Inborn", "Congenital/Inborn"),
            ("Acquired", "Acquired")
        ]
    )

    disability = models.ForeignKey(
        Disability,
        on_delete=models.CASCADE
    )

    applicant = models.ForeignKey(
        Applicant,
        on_delete=models.CASCADE,
        related_name='applicant_disabilities'
    )

    def __str__(self):
        return super().__str__()