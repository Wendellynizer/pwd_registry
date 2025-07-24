from django.db import transaction
from rest_framework import serializers

from ..models.address import *
from ..models.employment import *
from ..models.idreference import *
from ..models.application import *
from ..models.disability import ApplicantDisability, Disability
from .disability_ser import DisabilitySerializer

# serialized data into JSON etc.
class BarangaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Barangay
        fields = '__all__'

class AddressSerializer(serializers.ModelSerializer):
    barangay_details = BarangaySerializer(source='barangay', read_only=True)

    # Write-only barangay ID
    barangay = serializers.PrimaryKeyRelatedField(
        queryset=Barangay.objects.all(), write_only=True
    )

    class Meta:
        model = Address
        fields = '__all__'
class OccupationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Occupation
        fields = '__all__'

class EmploymentSerializer(serializers.ModelSerializer):
    emp_status_display = serializers.SerializerMethodField()
    emp_category_display = serializers.SerializerMethodField()
    emp_type_display = serializers.SerializerMethodField()

    occupation_details = OccupationSerializer(source='occupation', read_only=True)

    # Write-only barangay ID
    occupation = serializers.PrimaryKeyRelatedField(
        queryset=Occupation.objects.all(), write_only=True
    )

    class Meta:
        model = Employment
        fields = '__all__'

    def get_emp_status_display(self, obj):
        return obj.get_emp_status_display()
    
    def get_emp_category_display(self, obj):
        return obj.get_emp_category_display()
    
    def get_emp_type_display(self, obj):
        return obj.get_emp_type_display()

class IDReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = IDReference
        fields = '__all__'

class ApplicantDisabilitySerializer(serializers.ModelSerializer):
     # This will be used only for reading
    disability_details = DisabilitySerializer(source='disability', read_only=True)
    # This will be used for writing
    disability = serializers.PrimaryKeyRelatedField(queryset=Disability.objects.all())
    class Meta:
        model = ApplicantDisability
        # fields = '__all__'
        exclude = ['applicant']

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

    @transaction.atomic
    def update(self, instance, validated_data):
        address_data = validated_data.pop('address', None)
        employment_data = validated_data.pop('employment', None)
        id_reference_data = validated_data.pop('id_reference', None)
        disabilities_data = validated_data.pop('applicant_disabilities', [])

        # Update Address
        if address_data:
            for attr, value in address_data.items():
                setattr(instance.address, attr, value)
            instance.address.save()

        # Update Employment
        if employment_data:
            for attr, value in employment_data.items():
                setattr(instance.employment, attr, value)
            instance.employment.save()

        # Update ID Reference
        if id_reference_data:
            for attr, value in id_reference_data.items():
                setattr(instance.id_reference, attr, value)
            instance.id_reference.save()

        # Replace all disabilities
        if disabilities_data:
            # Clear old ones
            instance.applicant_disabilities.all().delete()
            # Create new ones
            for disability in disabilities_data:
                ApplicantDisability.objects.create(applicant=instance, **disability)

        # Update remaining fields of Applicant
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance

    def get_educational_attainment_display(self, obj):
        return obj.get_educational_attainment_display()
    

class ApplicationSerializer(serializers.ModelSerializer):
    applicant = ApplicantSerializer()

    # accomplished_by_display = serializers.SerializerMethodField()


    class Meta:
        model = Application
        fields = '__all__'

    def get_accomplished_by_display(self, obj):
        return obj.get_accomplished_by_display()

    @transaction.atomic
    def create(self, validated_data):
        applicant_data = validated_data.pop('applicant')
        # disabilities_data = validated_data.pop('applicant_disabilities', [])

        applicant = ApplicantSerializer().create(applicant_data)


        return Application.objects.create(applicant=applicant, **validated_data)
    
    @transaction.atomic
    def update(self, instance, validated_data):
        applicant_data = validated_data.pop('applicant', None)

        # Update nested Applicant
        if applicant_data:
            ApplicantSerializer().update(instance.applicant, applicant_data)

        # Update fields on Application
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance
    
