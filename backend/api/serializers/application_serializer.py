from rest_framework import serializers
from django.db import transaction

from . import ApplicantSerializer, ApplicantListSerializer
from api.models.application import Application


# --- APPLICATION SERIALIZERS ---
class ApplicationSerializer(serializers.ModelSerializer):
    applicant = ApplicantSerializer()

    class Meta:
        model = Application
        fields = '__all__'

    def get_accomplished_by_display(self, obj):
        return obj.get_accomplished_by_display()

    @transaction.atomic
    def create(self, validated_data):
        #* pops and create applicant record 
        applicant_data = validated_data.pop('applicant')
        applicant = ApplicantSerializer().create(applicant_data)

        return Application.objects.create(applicant=applicant, **validated_data)
    
    @transaction.atomic
    def update(self, instance, validated_data):
        applicant_data = validated_data.pop('applicant', None)

        if applicant_data:
            ApplicantSerializer().update(instance.applicant, applicant_data)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance
     

class ApplicationListSerializer(serializers.ModelSerializer):
    applicant = ApplicantListSerializer()

    class Meta:
        model = Application
        fields = ('id', 'registration_no', 'date_applied', 'status', 'applicant')