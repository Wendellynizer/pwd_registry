from django.db import models

class Barangay(models.Model):
    barangay_name = models.CharField(max_length=50)

    def __str__(self):
        return self.barangay_name
    
class Address(models.Model):
    street_address = models.CharField(max_length=100)
    barangay = models.ForeignKey(
        Barangay, 
        on_delete=models.CASCADE,
    )
    city = models.CharField(max_length=50)
    province = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.street_address} {self.barangay.barangay_name}'