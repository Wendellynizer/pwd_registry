from django.db import models


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
        on_delete=models.CASCADE,
        related_name="disabilities"
    )

    def __str__(self):
        return self.disability_name