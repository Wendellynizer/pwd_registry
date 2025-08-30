from django.db import models

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
    

    #* contact
    landline = models.CharField(max_length=20, null=True, blank=True)
    mobile_no = models.CharField(max_length=20, null=True, blank=True)
    email = models.CharField(max_length=20, null=True, blank=True)

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

    family_details = models.JSONField(default=dict)

    profile_image_path = models.CharField(max_length=255, null=True, blank=True)
    # profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
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