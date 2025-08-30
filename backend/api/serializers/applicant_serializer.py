from rest_framework import serializers
from django.db import transaction

from . import AddressSerializer, EmploymentSerializer, IDReferenceSerializer, ApplicantDisabilitySerializer, ApplicantDisabilityListSerializer
from api.models import Applicant, Address, Employment, IDReference, ApplicantDisability


# --- APPLICANT SERIALIZER ---
class ApplicantSerializer(serializers.ModelSerializer):

    address = AddressSerializer()
    employment = EmploymentSerializer()
    id_reference = IDReferenceSerializer()
    applicant_disabilities = ApplicantDisabilitySerializer(many=True)

    # This is for output: returns the label instead of the code
    educational_attainment_display = serializers.SerializerMethodField()
    

    class Meta:
        model = Applicant
        fields = '__all__'

    @transaction.atomic
    def create(self, validated_data):
        address_data = validated_data.pop('address')
        employment_data = validated_data.pop('employment')
        id_reference_data = validated_data.pop('id_reference')
        disabilities_data = validated_data.pop('applicant_disabilities', [])
        

        address = Address.objects.create(**address_data)
        employment = Employment.objects.create(**employment_data)
        id_reference = IDReference.objects.create(**id_reference_data)

        applicant = Applicant.objects.create(
            address=address,
            employment=employment,
            id_reference=id_reference,
            **validated_data
        )

        for disability in disabilities_data:
            ApplicantDisability.objects.create(applicant=applicant, **disability)
    
        return applicant

    def update(self, instance, validated_data):
        address_data = validated_data.pop('address', None)
        employment_data = validated_data.pop('employment', None)
        id_reference_data = validated_data.pop('id_reference', None)
        disabilities_data = validated_data.pop('applicant_disabilities', None)  # allow None for PATCH

        # Update address if present
        if address_data:
            for attr, value in address_data.items():
                setattr(instance.address, attr, value)
            instance.address.save()
        
        # Update employment if present
        if employment_data:
            for attr, value in employment_data.items():
                setattr(instance.employment, attr, value)
            instance.employment.save()

        # Update id_reference if present
        if id_reference_data:
            for attr, value in id_reference_data.items():
                setattr(instance.id_reference, attr, value)
            instance.id_reference.save()

        # Replace disabilities only if provided
        if disabilities_data is not None:
            instance.applicant_disabilities.all().delete()
            for disability in disabilities_data:
                ApplicantDisability.objects.create(applicant=instance, **disability)

        # Update remaining fields of applicant
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance

    def get_educational_attainment_display(self, obj):
        return obj.get_educational_attainment_display()
    

class ApplicantListSerializer(serializers.ModelSerializer):
    applicant_disabilities = ApplicantDisabilityListSerializer(many=True, read_only=True)
    
    class Meta:
        model = Applicant
        fields = ('lastname', 'firstname', 'middlename', 'applicant_disabilities')

