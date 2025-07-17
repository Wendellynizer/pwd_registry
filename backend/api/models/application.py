import datetime
from django.db import models

from .address import Address
from .employment import Employment
from .idreference import IDReference

class Applicant(models.Model):
    #* personal info
    lastname = models.CharField(max_length=100)
    firstname = models.CharField(max_length=100)
    middlename = models.CharField(max_length=100, null=True, blank=True)
    suffix = models.CharField(max_length=10, null=True, blank=True)
    maidenname = models.CharField(max_length=100, null=True, blank=True)

    birthdate = models.DateField()
    gender = models.CharField(  
        max_length=6,
        choices=[('M', 'Male'), ('F', 'Female')]
    )
    civil_status = models.CharField(  
        max_length=40,
        choices=[
            ('Si', 'Single'), 
            ('Se', 'Separated'),
            ('Co', 'Cohabitation (live-in)'),
            ('Ma', 'Married'),
            ('Wi', 'Widow/er'),
        ]
    )
    
    address = models.OneToOneField(
        Address,
        on_delete=models.CASCADE
    )

    #* contact
    landline = models.CharField(max_length=20, null=True)
    mobile_no = models.CharField(max_length=20, null=True)
    email = models.CharField(max_length=20, null=True)

    educational_attainment = models.CharField(  
        max_length=30,
        choices=[
            ('No', 'None'), 
            ('Ki', 'Kindergarten'),
            ('El', 'Elementary'),
            ('Jh', 'Junior High School'),
            ('Sh', 'Senior High School'),
            ('Co', 'College'),
            ('Vo', 'Vocational'),
            ('Po', 'Post Graduate'),
        ]
    )

    employment = models.ForeignKey(
        Employment,
        on_delete=models.CASCADE
    )

    family_details = models.JSONField(default=dict)

    #* gov't ids
    id_reference = models.ForeignKey(
        IDReference,
        on_delete=models.CASCADE
    )

    profile_image_path = models.CharField(max_length=255, null=True, blank=True)
    apparent_disability = models.CharField(
        max_length=3,
        choices=[
            ('Y', 'Yes'),
            ('N', 'No'),
        ]
    ) 
    coordinates = models.JSONField(default=dict)

    def __str__(self):
        return f'{self.firstname} {self.middlename} {self.lastname}'

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
    
    physician_name = models.CharField(max_length=100)
    physician_license_no = models.CharField(max_length=50)

    #! temp -> processing office (string or user reference?)
    processing_officer = models.CharField(max_length=100, null=True, blank=True)
    approving_officer = models.CharField(max_length=100, null=True, blank=True)
    encoder = models.CharField(max_length=100, null=True, blank=True)

    reporting_unit = models.CharField(max_length=100, null=True, blank=True)
    control_no = models.CharField(max_length=50, null=True, blank=True)

    date_applied = models.DateField(auto_now_add=True)