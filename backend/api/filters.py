import django_filters
from api.models.application import Application

class ApplicationFilter(django_filters.FilterSet):
    status = django_filters.CharFilter(field_name='status', lookup_expr='iexact')
    registration_type = django_filters.CharFilter(field_name='registration_type', lookup_expr='iexact')
    date_applied__gte = django_filters.DateFilter(field_name='date_applied', lookup_expr='gte')
    date_applied__lte = django_filters.DateFilter(field_name='date_applied', lookup_expr='lte')

    disability_type = django_filters.NumberFilter(method='filter_disability_type')

    class Meta:
        model = Application
        fields = ['status', 'registration_type', 'date_applied__gte', 'date_applied__lte']

    def filter_disability_type(self, queryset, name, value):
            return queryset.filter(
                applicant__applicant_disabilities__disability__disability_type__id=value
            ).distinct()