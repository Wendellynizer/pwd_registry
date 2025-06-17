from django.contrib import admin
from .models.address import *

# Register your models here.
admin.site.register([
    Barangay, Address
])
# admin.site.register(Address)s