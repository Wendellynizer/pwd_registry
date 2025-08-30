from django.db import models

from .pwd import PWD

class PWDCard(models.Model):
    pwd = models.OneToOneField(
        PWD,
        on_delete=models.CASCADE
    )

    issued_pwd_id = models.CharField(unique=True)
    id_issuance_date = models.DateField(auto_now_add=True)
    id_expiration_date = models.DateField()

    # active, inactive, expiring
    id_status = models.CharField(max_length=10)

    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField()

    def __str__(self):
        return f"Card of {self.pwd.application.applicant.firstname}"