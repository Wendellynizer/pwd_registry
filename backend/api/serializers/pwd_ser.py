from rest_framework import serializers

from ..models.pwd import PWDInfo

from .applicant_info_ser import *

class PWDInfoSerializer(serializers.ModelSerializer):
    application = ApplicationSerializer()
    class Meta:
        model = PWDInfo
        fields = '__all__'
