from django.db import models

from .application import Application

class PWDInfo(models.Model):
    application = models.ForeignKey(
        Application,
        on_delete=models.CASCADE
    )

    # status = models.CharField(
    #     max_length=20,
    #     choices=[

    #     ]
    # )

    inactive_reason = models.CharField(max_length=255)
    date_died = models.DateField(null=True, blank=True)

    issued_pwd_id = models.CharField(max_length=255)
    issuance_date = models.DateField()
    id_expiration = models.DateField()


class StatusLog(models.Model):
    pwd = models.ForeignKey(
        PWDInfo,
        on_delete=models.CASCADE
    )

    message = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)