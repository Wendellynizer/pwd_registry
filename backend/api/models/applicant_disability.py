from django.db import models

from . import Disability

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
        on_delete=models.CASCADE,
        related_name='disability'
    )

    applicant = models.ForeignKey(
        "Applicant",
        on_delete=models.CASCADE,
        related_name='applicant_disabilities'
    )

    def __str__(self):
        return super().__str__()