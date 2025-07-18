from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import OccupationViewSet, ApplicationViewSet, DisabilityViewSet
from .views import get_barangays, get_disability_types

router = DefaultRouter()

router.register('occupations', OccupationViewSet, basename='occupation')
router.register('disabilities', DisabilityViewSet, basename='disabilities')
router.register('application', ApplicationViewSet, basename='application')

urlpatterns = [
    # Add your API endpoints here, for example:
    # path('users/', include('users.urls')),
    path('barangays/', get_barangays),
    path('disability-types/', get_disability_types),
    path('', include(router.urls))
]