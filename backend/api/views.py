from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import api_view


from .models.address import Barangay
from .models.disability import DisabilityType

from .serializers.applicant_info_ser import *
from .serializers.disability_ser import *

# api for barangays
@api_view(['GET'])
def get_barangays(request):
    entries = Barangay.objects.all().order_by('barangay_name')
    serialized = BarangaySerializer(entries, many=True)
    
    return Response(serialized.data)

# api for disability types
@api_view(['GET'])
def get_disability_types(request):
    entries = DisabilityType.objects.all().order_by('disability_type_name')
    serialized = DisabilityTypeSerializer(entries, many=True)

    return Response(serialized.data)

# occupaton api
class OccupationViewSet(ModelViewSet):
    queryset = Occupation.objects.all()
    serializer_class = OccupationSerializer

class DisabilityViewSet(ModelViewSet):
    queryset = Disability.objects.all()
    serializer_class = DisabilitySerializer


# application api
class ApplicationViewSet(ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer