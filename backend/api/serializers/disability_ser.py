from rest_framework import serializers

from ..models.disability import *
# from .applicant_info_ser import ApplicantSerializer

class DisabilityTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DisabilityType
        fields = '__all__'

class DisabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Disability
        fields = '__all__'

