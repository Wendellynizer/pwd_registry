from rest_framework import serializers

from ..models.pwd import PWDInfo, StatusLog

from .applicant_info_ser import *

class PWDInfoSerializer(serializers.ModelSerializer):
    application = ApplicationSerializer()
    class Meta:
        model = PWDInfo
        fields = '__all__'

class StatusLogSerializer(serializers.ModelSerializer):
    pwd = serializers.PrimaryKeyRelatedField(queryset=PWDInfo.objects.all())

    class Meta:
        model = StatusLog
        fields = '__all__'
