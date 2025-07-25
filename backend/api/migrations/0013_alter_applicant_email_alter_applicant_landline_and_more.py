# Generated by Django 5.2.2 on 2025-07-21 17:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_alter_application_physician_license_no_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='applicant',
            name='email',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='applicant',
            name='landline',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='applicant',
            name='mobile_no',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='employment',
            name='other_occupation',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.CreateModel(
            name='PWDInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(max_length=20)),
                ('inactive_reason', models.CharField(max_length=255)),
                ('date_died', models.DateField()),
                ('issued_pwd_id', models.CharField(max_length=255)),
                ('issuance_date', models.DateField()),
                ('id_expiration', models.DateField()),
                ('application', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.application')),
            ],
        ),
    ]
