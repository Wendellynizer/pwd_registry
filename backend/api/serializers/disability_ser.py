from rest_framework import serializers

from ..models.disability import *

class DisabilityTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DisabilityType
        fields = '__all__'

class DisabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Disability
        fields = '__all__'

class ApplicantDisabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicantDisability
        fields = '__all__'