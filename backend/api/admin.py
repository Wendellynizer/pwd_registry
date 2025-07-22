from django.contrib import admin

from .models.pwd import *
from .models.address import *
from .models.employment import *
from .models.disability import *
from .models.idreference import *
from .models.application import *

# Register your models here.
admin.site.register([
    Barangay, Address, Occupation, Employment, DisabilityType,
    Disability, ApplicantDisability,
    IDReference, 
    Applicant, Application, PWDInfo
])
# admin.site.register(Address)s

