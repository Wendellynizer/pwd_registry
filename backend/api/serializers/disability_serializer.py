from rest_framework import serializers

from api.models import Disability, DisabilityType

class DisabilityTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DisabilityType
        fields = ['disability_type_name']


# --- DISABILITY SERIALIZERS ---
class DisabilitySerializer(serializers.ModelSerializer):

    disability_type = serializers.PrimaryKeyRelatedField(
            queryset=DisabilityType.objects.all(), write_only=True
    )

    # Output the disability_type_name on read
    disability_type_name = serializers.CharField(
        source='disability_type.disability_type_name', read_only=True
    )
    class Meta:
        model = Disability
        fields = '__all__'