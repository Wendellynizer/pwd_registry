from rest_framework import serializers

from api.models.address import Barangay, Address
from api.models.employment import Occupation, Employment
from api.models.idreference import IDReference

# serialized data into JSON etc.
class BarangaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Barangay
        fields = ['barangay_name']

class AddressSerializer(serializers.ModelSerializer):
    
    # writing
    barangay_id = serializers.PrimaryKeyRelatedField(
        queryset=Barangay.objects.only('id'),
        source='barangay',
        write_only=True
    )

    # reading
    barangay = BarangaySerializer(read_only=True)

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




