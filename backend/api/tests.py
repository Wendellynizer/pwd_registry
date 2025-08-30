from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from .models.application import Application


class ApplicationTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = '/applications/'
        

    def test_create_book(self):
        data = {
            "applicant": {
            "lastname": "Sabelo",
            "middlename": "Wendel",
            "firstname": "Wendel",
            "suffix": "Jr",
            "maidenname": "Pop",
            'birthdate': "2004-08-27",
            'gender': "M",
            'civil_status': "Si",
            'landline': "",
            'mobile_no': "",
            'email': "",
            'educational_attainment': "No",
            'apparent_disability': "Y",
            'address': {
                "street_address": "Purok 3",
                "barangay": 1,
                "city": "Tagum City",
                "province": "Davao del Norte",
                "region": "XI",
            },
            'employment': {
                'emp_status': "Em",
                'emp_category': "Go",
                'emp_type': "Re",
                'occupation': 1,
                'other_occupation': "",
                'organization': {
                    'affiliated_org': "",
                    'contact_person': "",
                    'office_address': "",
                    'tel_no': "",
                },
            },
            'id_reference': {
                'sss_no': "",
                'gsis_no': "",
                'pagibig_no': "",
                'psn_no': "",
                'philhealth_no': "",
                'other_id': "",
                'other_id_no': "",
            },
            'applicant_disabilities': [
                {"disability_type": 1, "disability_name": ""}
            ],
            },
            'family_details': {
                'father_lastname': "Wemnde",
                'father_firstname': "Sabelo",
                'father_middlename': "Wenz",
                'mother_lastname': "",
                'mother_firstname': "",
                'mother_middlename': "",
                'guardian_lastname': "",
                'guardian_firstname': "",
                'guardian_middlename': "",
            },
            'registration_type': "Wa",
            'registration_no': '123',
            'accomplished_by': "Ap",
            'accomplished_by_name': "Wendel Sabelo",
            'physician_name': "",
            'physician_license_no': "",
            'processing_officer': "Wendel",
            'approving_officer': "Wendel",
            'encoder': "",
            'reporting_unit': "PDAO",
            'control_no': "",
        }

        response = self.client.post(self.url, data, format='json')
        
        print(response)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)