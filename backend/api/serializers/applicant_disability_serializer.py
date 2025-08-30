from rest_framework import serializers

from . import Disability, DisabilitySerializer
from api.models.applicant_disability import ApplicantDisability


# --- APPLICANT DISABILITY SERIALIZERS ---
class ApplicantDisabilitySerializer(serializers.ModelSerializer):
     # This will be used only for reading
    disability_details = DisabilitySerializer(source='disability', read_only=True)
    # This will be used for writing
    disability_id = serializers.PrimaryKeyRelatedField(queryset=Disability.objects.all())
    class Meta:
        model = ApplicantDisability
        # fields = '__all__'
        exclude = ['applicant']

class ApplicantDisabilityListSerializer(serializers.ModelSerializer):

    disability = DisabilitySerializer(read_only=True)
    class Meta:
        model = ApplicantDisability
        fields = ['id', 'disability_cause', 'disability']
