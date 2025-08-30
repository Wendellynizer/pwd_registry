from django.db import models
from django.contrib import admin

from .application import Application

class PWD(models.Model):
    application = models.ForeignKey(
        Application,
        on_delete=models.CASCADE
    )

    inactive_reason = models.CharField(max_length=255,)
    date_died = models.DateField(null=True, blank=True)

    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField()

    # just improves UI in admin page
    @admin.display(
        boolean=True
    )

    def is_active(self):
        return self.inactive_reason == ""