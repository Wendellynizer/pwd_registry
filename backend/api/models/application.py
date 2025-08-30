from django.db import models

from .applicant import Applicant

class Application(models.Model):
    applicant = models.OneToOneField(
        Applicant,
        on_delete=models.CASCADE
    )

    registration_no = models.CharField(max_length=8)
    registration_type = models.CharField(
        max_length=30, 
        choices=[
            ('Wa', 'Walk-in Application'),
            ('Ol', 'Online Application')
        ]
    )

    accomplished_by = models.CharField(
        max_length=30,
        choices=[
            ('Ap', 'Applicant'),
            ('Gu', 'Guardian'),
            ('Re', 'Representative')
        ]
    )

    accomplished_by_name = models.CharField(max_length=100)
    
    physician_name = models.CharField(max_length=100, null=True, blank=True)
    physician_license_no = models.CharField(max_length=50, null=True, blank=True)

    #! temp -> processing office (string or user reference?)
    processing_officer = models.CharField(max_length=100, null=True, blank=True)
    approving_officer = models.CharField(max_length=100, null=True, blank=True)
    encoder = models.CharField(max_length=100, null=True, blank=True)

    reporting_unit = models.CharField(max_length=100, null=True, blank=True)
    control_no = models.CharField(max_length=50, null=True, blank=True)

    status = models.CharField(
        max_length=15,
        choices=[
            ('Pending', 'Pending'),
            ('Rejected', 'Rejected'),
            ('Approved', 'Approved')
        ],
        default='Pending'
    )

    date_applied = models.DateField(auto_now_add=True)

    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField()

    def __str__(self):
        return f"{self.applicant} App"