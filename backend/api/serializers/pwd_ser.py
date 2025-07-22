from rest_framework import serializers

from ..models.pwd import PWDInfo

class PWDInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PWDInfo
        fields = '__all__'