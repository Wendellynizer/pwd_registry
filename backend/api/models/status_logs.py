from django.db import models

from .pwd import PWD

class StatusLog(models.Model):
    pwd = models.ForeignKey(
        PWD,
        on_delete=models.CASCADE
    )

    # user here

    status_message = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)