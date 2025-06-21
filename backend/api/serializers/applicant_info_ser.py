from rest_framework import serializers

from ..models.address import *
from ..models.employment import *
from ..models.idreference import *
from ..models.application import *

# serialized data into JSON etc.
class BarangaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Barangay
        fields = '__all__'

class AddressSerializer(serializers.Serializer):
    pass 

class OccupationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Occupation
        fields = '__all__'

class EmploymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employment
        fields = '__all__'

class IDReferenaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = IDReference
        fields = '__all__'

class ApplicantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applicant
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'