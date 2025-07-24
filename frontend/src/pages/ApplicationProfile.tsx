import React, { useEffect, useState } from 'react'
import { applicationCrud } from '../api/modules/application';
import { Link, useParams } from 'react-router';
import { ChevronLeft, SquarePen } from 'lucide-react';
import AccordionItem from '../components/AccordionItem';
import axios from 'axios';
import { baseURL } from '../api';
import defaultImage from '../assets/default.jpg';


const ApplicationProfile = () => {
  
  const { applicationId } = useParams()

  const [application, setApplication] = useState<any>(null);
  const [verdict, setVerdict] = useState('');

	let father_name;
	let mother_name;
	let guardian_name;

  //! change this please 
  const onSubmit = async(e: any) => {
    e.preventDefault();

    const formData = {
      verdict: verdict
    }

    try {
    const response = await axios.post(
      // `http://127.0.0.1:8000/api/applications/${application.id}/decision/`,
      `${baseURL}applications/${application.id}/decision/`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

      console.log('Success', response.data);
      alert('Application processed successfully.');
    } catch (error) {
      console.error('Failed:', error.response?.data || error.message);
      alert('Something went wrong.');
    }
  };

  useEffect(() => {
    // load the applicant data
    const loadApplication = async() => {
      const data = await applicationCrud.get(applicationId);

      console.log(data);
      setApplication(data);

			// setup family details name for easy access
			father_name = `${application.applicant.family_details.father_firstname} ${application.applicant.family_details.father_middlename} ${application.applicant.family_details.father_lastname}`

			mother_name = `${application.applicant.family_details.mother_firstname} ${application.applicant.family_details.mother_middlename} ${application.applicant.family_details.mother_lastname}`

			guardian_name = `${application.applicant.family_details.guardian_firstname} ${application.applicant.family_details.guardian_middlename} ${application.applicant.family_details.guardian_lastname}`
    }

    loadApplication();
  }, []);


  if(!application) {
    return <p>Loading Data...</p>
  } 

  return (
    <div className='p-5'>
      {/* back button */}
      <Link to='/application' className='block text-blue-500 mb-6 w-fit'>
        <div className='flex items-center gap-2'>
          <ChevronLeft />
          Back
        </div>
      </Link>

      {/* application data */}
      <div className='space-y-4 mb-12'>
        <Container>
          <div className='flex gap-4 items-center'>
            <div className="avatar">
              <div className="w-24 rounded-xs">
                <img src={defaultImage} />
              </div>
            </div>
  
            <div className='flex-1'>
              <p className='text-xl font-medium'>
                {application.applicant.lastname}, {application.applicant.firstname} {application.applicant.middlename}, {application.applicant.suffix}
              </p>
  
              <p className='text-sm mt-2'><span className='text-gray-400'>Registration No:</span> {application.registration_no}</p>
              <p className='text-sm'>
                <span className='text-gray-400'>Registration Type: </span> 
                {application.registration_type === 'Wa' ? 'Walk-in Application' : 'Online Application'}
              </p>
							<p className='text-sm'>
                <span className='text-gray-400'>Application Status: </span> 
                {application.status}
              </p>
            </div>

						<div className='border px-2 py-1 rounded-sm border-gray-400'>
							<Link to=''>
								<div className='flex gap-2 text-amber-600'>
									<p>Edit</p>
									<SquarePen />
								</div>
							</Link>
						</div>
          </div>
        </Container>

        <AccordionItem title='Address'>
          <ColumnedContainer column='grid-cols-3'>
            <div className='space-y-4'>
              <DataContainer label='House No. and Street' value={application.applicant.address.street_address} />

              <DataContainer label='Province' value={application.applicant.address.province} />
            </div>

            <div className='space-y-4'>
              <DataContainer label='Barangay' value={application.applicant.address.barangay_details.barangay_name} />
              <DataContainer label='Region' value={application.applicant.address.region} />
            </div>

            <div className='space-y-4'>
              <DataContainer label='City' value={application.applicant.address.city} />
            </div>
          </ColumnedContainer>
        </AccordionItem>
  
        <AccordionItem title='Disability Information'>
          <ColumnedContainer column='grid-cols-3'>
            <div className=''> 
              <p className='font-semibold mb-2'>Cause</p>
              
              <div className='space-y-2'>
                {application.applicant.applicant_disabilities.map((dis: any, index: any) => (
                  <p key={index}>{dis.disability_cause}</p>
                ))}
              </div>
               
            </div>

            <div className=''>
              <p className='font-semibold mb-2'>Disability</p>
              
              <div className='space-y-2'>
                {application.applicant.applicant_disabilities.map((dis: any, index: any) => (
                  <p key={index}>{dis.disability_details.disability_name}</p>
                ))}
              </div>
            </div>

            <div className=''> 
              <p className='font-semibold mb-2'>Type</p>
              
              <div className='space-y-2'>
                {application.applicant.applicant_disabilities.map((dis:any, index:any) => (
                  <p key={index}>{dis.disability_details.disability_type.disability_type_name}</p>
                ))}
              </div>
            </div>
          </ColumnedContainer>
        </AccordionItem>

        <AccordionItem title='Contact Information'>
          <ColumnedContainer>
						<DataContainer label='Landline' value={application.applicant.landline} />
						<DataContainer label='Mobile No.' value={application.applicant.mobile_no} />
						<DataContainer label='Email' value={application.applicant.email} />
          </ColumnedContainer>
        </AccordionItem>

        <AccordionItem title='Background'>
					<DataContainer label='Educational Attainment' value={application.applicant.educational_attainment_display} />

					<ColumnedContainer>
						<DataContainer label='Employment Status' value={application.applicant.educational_attainment_display} />
						<DataContainer label='Employment Category' value={application.applicant.employment.emp_status_display} />
						<DataContainer label='Employment Type' value={application.applicant.employment.emp_type_display} />
						<DataContainer label='Occupation' value={application.applicant.employment.occupation_details.occupation_name} />
						<DataContainer label='Other Occupation' value={application.applicant.employment.other_occupation} />
					</ColumnedContainer>
        </AccordionItem>

				<AccordionItem title='Organization'>
					<ColumnedContainer column='grid-cols-4'>
						<DataContainer label='Organization Affiliated' value={application.applicant.employment.organization.affiliated_org} />
						<DataContainer label='Contact Person' value={application.applicant.employment.organization.contact_person} />
						<DataContainer label='Office Address' value={application.applicant.employment.organization.office_address} />
						<DataContainer label='Tel. No.' value={application.applicant.employment.organization.tel_no} />
					</ColumnedContainer>
				</AccordionItem>

        <AccordionItem title='ID Reference No.'>
					<ColumnedContainer>
						<DataContainer label='SSS' value={application.applicant.id_reference.sss_no} />
						<DataContainer label='GSIS' value={application.applicant.id_reference.gsis_no} />
						<DataContainer label='PAG-IBIG' value={application.applicant.id_reference.pagibig_no} />
						<DataContainer label='PSN' value={application.applicant.id_reference.psn_no} />
						<DataContainer label='PhilHealth' value={application.applicant.id_reference.philhealth_no} />
						<DataContainer label='Other ID' value={application.applicant.id_reference.other_id} />
						<DataContainer label='Other ID No.' value={application.applicant.id_reference.other_id_no} />
					</ColumnedContainer>
        </AccordionItem>

        <AccordionItem title='Family Background'>
					<ColumnedContainer>
						<DataContainer label='Father Name' value={father_name} />

						<DataContainer label='Mother Name' value={mother_name} />

						<DataContainer label='Guardian Name' value={guardian_name} />
					</ColumnedContainer>
        </AccordionItem>

        <AccordionItem title='Documents' opened={false}>
          <ColumnedContainer>
            <DataContainer label='Photocopy of Medical Certificate' value="-" />
            <DataContainer label='Voters ID / Certification / National ID' value="-" />
            <DataContainer label='Duly Accomplished Application Form' value="-" />
          </ColumnedContainer>
        </AccordionItem>

        <AccordionItem title='Processing Information'>
					<ColumnedContainer>
						<DataContainer label='Accomplished By' value={application.accomplished_by_display} />
						<DataContainer label='Accomplisher Name' value={application.accomplished_by_name} />
					</ColumnedContainer>

					<ColumnedContainer>
						<DataContainer label='Physician Name' value={application.physician_name} />
						<DataContainer label='Physician License No.' value={application.physician_license_no} />
					</ColumnedContainer>

					<ColumnedContainer>
						<DataContainer label='Processing Officer' value={application.processing_officer} />
						<DataContainer label='Approving Officer' value={application.processing_officer} />
						<DataContainer label='Encoder' value={application.encoder} />
						<DataContainer label='Reporting Unit (Office/Section)' value={application.reporting_unit} />
						<DataContainer label='Control No.' value={application.control_no} />
					</ColumnedContainer>
        </AccordionItem>
      </div>

      <form onSubmit={onSubmit} method='POST'>
        <input type="hidden" name='application_id' value={application.id} />
        <div className='bg-white border-t-2 border-[#437057] fixed bottom-0 left-0 right-0 md:ms-64 p-2 flex justify-end gap-4'>
          <Link to='/application' className='btn bg-white text-gray-500'>Cancel</Link>
          <button type='submit' className='btn bg-error text-white' onClick={() => setVerdict('Rejected')}>Reject</button>
          <button type='submit' className='btn bg-[#437057] text-white' onClick={() => setVerdict('Approved')}>Approve</button>
        </div>
      </form>
    </div>
  );
}

export default ApplicationProfile;


const Container = ({children}: {children: React.ReactNode}) => {

  return(
    <div className='border-1 border-gray-300 rounded-sm p-4'>
      {children}
    </div>
  );
};

const ColumnedContainer = ({
  children,
  column = "grid-cols-3",
}: {
  children?: React.ReactNode;
  column?: string;
}) => {
  // return <div className="flex gap-4">{children}</div>;
  return <div className={`grid ${column} gap-4`}>{children}</div>;
}

const DataContainer = ({
  label,
  value = '-'
}) => {

	if(value == null || value == '') {
		value = '-';
	}

  return(
    <div>
      <p className='text-gray-400 text-sm mb-2'>{label}</p>
      <p>{value}</p>
    </div>
  );
}