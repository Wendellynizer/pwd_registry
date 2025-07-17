from django.db import transaction
from rest_framework import serializers

from ..models.address import *
from ..models.employment import *
from ..models.idreference import *
from ..models.application import *
from ..models.disability import ApplicantDisability
# from .disability_ser import ApplicantDisabilitySerializer

# serialized data into JSON etc.
class BarangaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Barangay
        fields = '__all__'

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'
class OccupationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Occupation
        fields = '__all__'

class EmploymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employment
        fields = '__all__'

class IDReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = IDReference
        fields = '__all__'

class ApplicantDisabilitySerializer(serializers.ModelSerializer):

    class Meta:
        model = ApplicantDisability
        # fields = '__all__'
        exclude = ['applicant']

class ApplicantSerializer(serializers.ModelSerializer):

    address = AddressSerializer()
    employment = EmploymentSerializer()
    id_reference = IDReferenceSerializer()
    applicant_disabilities = ApplicantDisabilitySerializer(many=True)
    

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







class ApplicationSerializer(serializers.ModelSerializer):
    applicant = ApplicantSerializer()

    class Meta:
        model = Application
        fields = '__all__'

    @transaction.atomic
    def create(self, validated_data):
        applicant_data = validated_data.pop('applicant')
        # disabilities_data = validated_data.pop('applicant_disabilities', [])

        applicant = ApplicantSerializer().create(applicant_data)


        return Application.objects.create(applicant=applicant, **validated_data)
    
