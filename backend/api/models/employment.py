from django.db import models

from . import Applicant
class Occupation(models.Model):
    
    applicant = models.OneToOneField(
        Applicant,
        on_delete=models.CASCADE
    )

    occupation_name = models.CharField(max_length=255)

    def __str__(self):
        return self.occupation_name
    
class Employment(models.Model):
    emp_status = models.CharField(
        max_length=15,
        choices=[
            ('Em', 'Employed'),
            ('Un', 'Unemployed'),
            ('Se', 'Self-employed'),
        ],
        default='Em'
    )
    
    emp_category = models.CharField(
        max_length=15,
        choices=[
            ('Go', 'Government'),
            ('Pr', 'Private'),
        ],
        default='Go'
    )

    emp_type = models.CharField(
        max_length=50,
        choices=[
            ('Re', 'Permanent/Regular'),
            ('Se', 'Seasonal'),
            ('Ca', 'Casual'),
            ('Em', 'Emergency'),
        ],
        default='Re'
    )

    occupation = models.ForeignKey(
        Occupation,
        on_delete=models.CASCADE,
        null=True
    )

    other_occupation = models.CharField(max_length=100, null=True, blank=True)
    organization = models.JSONField(default=dict, null=True, blank=True)

    # def __str__(self):
    #     return f'{self.}'