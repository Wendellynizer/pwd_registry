from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import OccupationViewSet, ApplicationViewSet, DisabilityViewSet, PWDInfoViewSet, StatusLog
from .views import get_barangays, get_disability_types, get_dashboard_data

router = DefaultRouter()

router.register(r'occupations', OccupationViewSet, basename='occupation')
router.register(r'disabilities', DisabilityViewSet, basename='disabilities')
router.register(r'applications', ApplicationViewSet, basename='applications')
router.register(r'pwds', PWDInfoViewSet, basename='pwds')
router.register(r'status_log', StatusLog, basename='status_log')

urlpatterns = [
    # Add your API endpoints here, for example:
    # path('users/', include('users.urls')),
    path('barangays/', get_barangays),
    path('disability-types/', get_disability_types),
    path('dashboard_data/', get_dashboard_data),
    path('', include(router.urls))
]