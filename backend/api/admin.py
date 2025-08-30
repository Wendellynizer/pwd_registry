from django.contrib import admin

from .models.pwd import *
from .models.status_logs import *
from .models.address import *
from .models.employment import *
from .models.disability import *
from .models.applicant_disability import *
from .models.idreference import *
from .models.application import *


class ApplicantAdmin(admin.ModelAdmin):
    list_display = [
        'lastname', 'firstname', 'middlename', 'birthdate', 'email',
        'gender', 'educational_attainment', 'family_details'
    ]

class ApplicationAdmin(admin.ModelAdmin):
    list_display = [
        'applicant', 'registration_no', 'accomplished_by', 'processing_officer', 
        'status'
    ]

class PWDAdmin(admin.ModelAdmin):
    list_display = [
        'application', 'date_died', 'created_at', 'updated_at', 
        'is_active'
    ]

class BarangayAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'barangay_name'
    ]

class AddressAdmin(admin.ModelAdmin):
    list_display = [
        'street_address', 'barangay', 'city', 'province', 'region'
    ]

class OccupationAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'occupation_name'
    ]

class EmploymentAdmin(admin.ModelAdmin):
    list_display = [
        'emp_status', 'emp_category', 'emp_type', 'occupation',
    ]

class DisabilityAdmin(admin.ModelAdmin):
    list_display = [
        'disability_name', 'disability_type'
    ]
    list_filter = ['disability_type']

class ApplicantDisabilityAdmin(admin.ModelAdmin):
    list_display = [
        'disability_cause', 'disability', 'applicant'
    ]


# Register your models here.
admin.site.register([
    DisabilityType, IDReference, StatusLog
])

admin.site.register(Barangay, BarangayAdmin)
admin.site.register(Address, AddressAdmin)
admin.site.register(Occupation, OccupationAdmin)
admin.site.register(Employment, EmploymentAdmin)
admin.site.register(Disability, DisabilityAdmin)
admin.site.register(ApplicantDisability, ApplicantDisabilityAdmin)

admin.site.register(Applicant, ApplicantAdmin)
admin.site.register(Application, ApplicationAdmin)
admin.site.register(PWD, PWDAdmin)


