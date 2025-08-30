
from datetime import date
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import api_view, action

from api.filters import ApplicationFilter


from .models.address import Barangay
from .models.disability import DisabilityType
from .models.pwd import PWD
from .models.status_logs import StatusLog

from .serializers import *

# FUNCTION BASE VIEWS
# fetch barangays
@api_view(['GET'])
def get_barangays(request):
    entries = Barangay.objects.all().order_by('barangay_name')
    serialized = BarangaySerializer(entries, many=True)
    
    return Response(serialized.data)

# fetch disability types
@api_view(['GET'])
def get_disability_types(request):
    entries = DisabilityType.objects.all().order_by('disability_type_name')
    serialized = DisabilityTypeSerializer(entries, many=True)

    return Response(serialized.data)

# fetch dashboard data
@api_view(['GET'])
def get_dashboard_data(request):
    return


# CLASS BASED VIEWS
# occupaton api
class OccupationViewSet(ModelViewSet):
    queryset = Occupation.objects.all()
    serializer_class = OccupationSerializer

class DisabilityViewSet(ModelViewSet):
    queryset = Disability.objects.all()
    serializer_class = DisabilitySerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        disability_type = self.request.query_params.get('type_id')
        if disability_type is not None:
            queryset = queryset.filter(disability_type=disability_type)
        return queryset



# application api
class ApplicationViewSet(ModelViewSet):
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
        queryset = super().get_queryset() 
        return queryset.order_by('-status')

    def get_serializer_class(self):
        if self.action == 'list':
            return ApplicationListSerializer
        return ApplicationSerializer


    #! helper only. please optimize and change this
    def generate_issued_pwd_id(self):
        from datetime import date

        year = date.today().year
        prefix = f"PWD-{year}-"

        last_id = PWD.objects.filter(
            issued_pwd_id__startswith=prefix
        ).order_by('-issued_pwd_id').first()

        if last_id and last_id.issued_pwd_id:
            try:
                last_sequence = int(last_id.issued_pwd_id.split("-")[-1])
            except (ValueError, IndexError):
                last_sequence = 0
        else:
            last_sequence = 0

        # Try generating the next ID and check for uniqueness
        while True:
            next_sequence = last_sequence + 1
            new_id = f"{prefix}{str(next_sequence).zfill(5)}"
            if not PWD.objects.filter(issued_pwd_id=new_id).exists():
                return new_id
            last_sequence += 1  # Continue to next sequence if already taken 
    
    @action(detail=True, methods=['post'])
    def decision(self, request, pk=None):
        print(request.data)
        verdict = request.data.get('verdict')

        try:
            application = self.get_object()
        except Application.DoesNotExist:
            return Response({"error": "Application not found"}, status=status.HTTP_404_NOT_FOUND)


        if verdict == "Approved":
            application.status = "Approved"
            application.save()

            if not hasattr(application, 'pwdinfo'):
                issuance_date = date.today()
                issued_pwd_id = self.generate_issued_pwd_id()

                try:
                    id_expiration = date(
                        issuance_date.year + 5,
                        issuance_date.month,
                        issuance_date.day
                    )
                except ValueError:
                    # Handles Feb 29 → Feb 28 fallback in non-leap years
                    id_expiration = date(
                        issuance_date.year + 5,
                        issuance_date.month,
                        28
                    )

                PWDInfo.objects.create(
                    application=application,
                    issued_pwd_id = issued_pwd_id,
                    issuance_date=issuance_date,
                    id_expiration=id_expiration
                )

            return Response({"message": "Application approved and PWDInfo created."}, status=200)

        elif verdict == "Rejected":
            application.status = "Rejected"
            application.save()

            return Response({"message": "Application rejected."}, status=200)

        return Response({"error": "Invalid action."}, status=400)



class PWDViewSet(ModelViewSet):
    queryset = PWD.objects.all()
    serializer_class = PWDInfoSerializer

class StatusLog(ModelViewSet):
    queryset = StatusLog.objects.all()
    serializer_class = StatusLogSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        pwd = self.request.query_params.get('pwd_id')
        if pwd is not None:
            queryset = queryset.filter(pwd=pwd)
        return queryset