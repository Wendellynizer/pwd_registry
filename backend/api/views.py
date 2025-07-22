
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import api_view

from api.filters import ApplicationFilter


from .models.address import Barangay
from .models.disability import DisabilityType
from .models.pwd import PWDInfo

from .serializers.applicant_info_ser import *
from .serializers.disability_ser import *
from .serializers.pwd_ser import *

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

@api_view(['GET'])
def get_dashboard_data(request):
    return

# occupaton api
class OccupationViewSet(ModelViewSet):
    queryset = Occupation.objects.all()
    serializer_class = OccupationSerializer

class DisabilityViewSet(ModelViewSet):
    queryset = Disability.objects.all()
    serializer_class = DisabilitySerializer


# application api
class ApplicationViewSet(ModelViewSet):
    # queryset = Application.objects.all().order_by('-id')
    queryset = Application.objects.select_related(
        'applicant__address__barangay',
        'applicant__employment__occupation',
        'applicant__id_reference',
    ).prefetch_related(
        'applicant__applicant_disabilities__disability__disability_type'
    ).all()
     
    serializer_class = ApplicationSerializer
    filterset_class = ApplicationFilter

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.order_by('-date_applied')


class PWDInfoViewSet(ModelViewSet):
    queryset = PWDInfo.objects.all()
    serializer_class = PWDInfoSerializer