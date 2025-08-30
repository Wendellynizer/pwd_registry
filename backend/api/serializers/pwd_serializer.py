from rest_framework import serializers

from . import ApplicationSerializer
from api.models.pwd import PWD
from api.models.status_logs import StatusLog


class PWDInfoSerializer(serializers.ModelSerializer):
    application = ApplicationSerializer()
    class Meta:
        model = PWD
        fields = '__all__'

class StatusLogSerializer(serializers.ModelSerializer):
    pwd = serializers.PrimaryKeyRelatedField(queryset=PWD.objects.all())

    class Meta:
        model = StatusLog
        fields = '__all__'
