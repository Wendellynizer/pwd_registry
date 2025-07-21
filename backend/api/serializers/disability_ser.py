from rest_framework import serializers

from ..models.disability import *
# from .applicant_info_ser import ApplicantSerializer

class DisabilityTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DisabilityType
        fields = ['disability_type_name']

class DisabilitySerializer(serializers.ModelSerializer):
    disability_type = DisabilityTypeSerializer()
    class Meta:
        model = Disability
        fields = '__all__'

