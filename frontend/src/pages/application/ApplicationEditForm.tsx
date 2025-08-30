import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import { useFieldArray, useForm, FormProvider } from 'react-hook-form';

import defaultImage from '@assets/images/default.png';
import TextInput from '@/components/common/form-context-inputs/TextInput';
import DateInput from '@/components/common/form-context-inputs/DateInput';
import RadioGroup from '@/components/common/form-context-inputs/Radio';
import SelectInput from '@/components/common/form-context-inputs/SelectInput';
import EmailInput from '@/components/common/form-context-inputs/Emailinput';
import DisabilityContainer from '@/components/custom/DisabilityContainer';
import Dropdown from '@/components/inputs/Dropdown';
import Button from '@/components/common/buttons/Button';
import AccordionItem from '@/components/custom/AccordionItem';

import { barangayService, occupationService, applicationService, disabilityService } from '@/services';


const ApplicationEditForm = () => {

  const navigate = useNavigate();

  const apiToFormData = (apiData: any) => {
    const { applicant, ...rest } = apiData;

    return {
      ...rest, // includes registration_no, etc.
      applicant: {
        lastname: applicant.lastname || '',
        firstname: applicant.firstname || '',
        middlename: applicant.middlename || '',
        suffix: applicant.suffix || '',
        maidenname: applicant.maidenname || '',
        birthdate: applicant.birthdate || '',
        gender: applicant.gender || '',
        civil_status: applicant.civil_status || '',
        landline: applicant.landline || '',
        mobile_no: applicant.mobile_no || '',
        email: applicant.email || '',
        educational_attainment: applicant.educational_attainment || '',
        apparent_disability: applicant.apparent_disability || '',

        address: {
          street_address: applicant.address?.street_address || '',
          barangay: applicant.address?.barangay_details.id || '',
          city: applicant.address?.city || 'Tagum City',
          province: applicant.address?.province || 'Davao del Norte',
          region: applicant.address?.region || 'XI',
        },

        employment: {
          emp_status: applicant.employment?.emp_status || '',
          emp_category: applicant.employment?.emp_category || '',
          emp_type: applicant.employment?.emp_type || '',
          occupation: applicant.employment?.occupation_details.id || '',
          other_occupation: applicant.employment?.other_occupation || '',
          organization: {
            affiliated_org: applicant.employment?.organization?.affiliated_org || '',
            contact_person: applicant.employment?.organization?.contact_person || '',
            office_address: applicant.employment?.organization?.office_address || '',
            tel_no: applicant.employment?.organization?.tel_no || '',
          },
        },

        id_reference: {
          sss_no: applicant.id_reference?.sss_no || '',
          gsis_no: applicant.id_reference?.gsis_no || '',
          pagibig_no: applicant.id_reference?.pagibig_no || '',
          psn_no: applicant.id_reference?.psn_no || '',
          philhealth_no: applicant.id_reference?.philhealth_no || '',
          other_id: applicant.id_reference?.other_id || '',
          other_id_no: applicant.id_reference?.other_id_no || '',
        },

        applicant_disabilities: (applicant.applicant_disabilities || []).map((d: any) => ({
          disability: d.disability_details.id || '',
          disability_cause: d.disability_cause || '',
        })),
      },

      family_details: {
        father_lastname: applicant.family_details?.father_lastname || '',
        father_firstname: applicant.family_details?.father_firstname || '',
        father_middlename: applicant.family_details?.father_middlename || '',
        mother_lastname: applicant.family_details?.mother_lastname || '',
        mother_firstname: applicant.family_details?.mother_firstname || '',
        mother_middlename: applicant.family_details?.mother_middlename || '',
        guardian_lastname: applicant.family_details?.guardian_lastname || '',
        guardian_firstname: applicant.family_details?.guardian_firstname || '',
        guardian_middlename: applicant.family_details?.guardian_middlename || '',
      }
    };
  }

  const methods = useForm();
  const { reset, control } = methods;

  // use for dynamic fields in disabilities
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'applicant.applicant_disabilities'
  })


  const onSubmit = async(formData: any) => {
    //  navigate("/test", { state: data });
    try {
      const data = await applicationService.patch(formData, applicationId);
      alert('Updated Successfully');

      navigate('/application');
    } catch(error) {
      console.error('Error Creating Application: ',error);
      return;
    }

    // console.log(formData)
    // navigate to application page
    // navigate('/application');
  }

  const [barangays, setBarangays] = useState({});
  const [occupations, setOccupations] = useState({});
  const [disabilitySelection, setDisabilitySelection] = useState({});

  const [otherSelected, setOtherSelected] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const fileInputRef = useRef(null);

  const handleProfileFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const otherOccupationSelected = () => {

  }

  const [application, setApplication] = useState<any>();
  const [loading, setLoading] = useState(true); // NEW
  const { applicationId } = useParams()

  useEffect(() => {
    // fetch barangays
    const getBarangay = async() => {
      // fetch barangay
      const response = await barangayService.getAll();
      // turn array into object
      const barangayArray = response.data.map((item: any) => ({
        label: item.barangay_name,
        value: item.id
      }));

      setBarangays(barangayArray);
      
    }

    // fetch occupations
    const getOccupation = async() => {
      //fetch occupation
      const response = await occupationService.getAll();
      
      const occupationArray = response.data.map((item: any) => ({
        label: item.occupation_name,
        value: item.id
      }));
      
      setOccupations(occupationArray);
      console.log(occupationArray);
    }

    // fetch disabilities 
    const getDisabilities = async() => {
      const response = await disabilityService.getAll();
      
      const disabilityArray = response.map((item: any) => ({
        value: item.id, 
        label: item.disability_name
      }));
      
      setDisabilitySelection(disabilityArray);
    }

    const loadApplication = async() => {
        try {
            const data = await applicationService.get(applicationId);
            setApplication(data);
            console.log(data);
            const formattedFormData = apiToFormData(data);
            reset(formattedFormData);
        } catch (error) {
            console.error("Error fetching application:", error);
        } finally {
            setLoading(false); // Set loading to false when done
        }
    }

    loadApplication();
    getBarangay();
    getOccupation();
    getDisabilities();
  }, []);

	

  if (loading || !reset) {
    return (
        <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-[#437057]"></span>
        </div>
    );
  }

  return (
    <div className='p-5'>
      <p className='text-lg mb-4 font-semibold'>Edit Form</p>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} method='POST' className='pb-8'>
          <AccordionItem title='Profile' opened={false}>
            <div className='flex flex-col'>
              <label htmlFor="" className='block mb-2 text-gray-400'>Add a Profile Picture</label>
              <div className="avatar">
                <div className="w-34 rounded">
                  <img src={previewURL || defaultImage} alt="Profile Preview" />
                </div>
              </div>
            </div>
            
            <div className='space-x-2'>
              <input 
              className='file-input file-input-sm' 
              type="file" 
              accept="image/*"
              onChange={handleProfileFileChange}
              ref={fileInputRef}
            />

            <button type="button" className='btn btn-sm' onClick={(e: any) => {
              setPreviewURL(null);
              setSelectedImage(null);

              if (fileInputRef.current) {
                fileInputRef.current.value = null; // clear input field
              }
            }}>Clear</button>
            </div>
            
          </AccordionItem>

          <AccordionItem title='Personal Information'>
            <InputContainer>
              <TextInput 
                label='Last Name'
                name='applicant.lastname'
                required
              />

              <TextInput 
                label='First Name'
                name='applicant.firstname'
                required
              />

              <TextInput 
                label='Middle Name'
                name='applicant.middlename'
              />
            </InputContainer>

            <InputContainer>
              <TextInput 
                label='Suffix'
                name='applicant.suffix'
              />

              <DateInput 
                label="Birthdate"
                name='applicant.birthdate'
                required
              />

              <TextInput 
                label='Maiden Name'
                name='applicant.maidenname'
              />
            </InputContainer>

            <InputContainer>
              <RadioGroup 
                label="Gender"
                name='applicant.gender'
                options={[
                  {label: 'Male', value: 'M'},
                  {label: 'Female', value: 'F'},
                ]}
                required
              />

              <SelectInput 
                label='Civil Status'
                name='applicant.civil_status'
                options={[
                  {label: "Single", value: 'Si'},
                  {label: "Separated", value: 'Se'},
                  {label: "Cohabitation (live-in)", value: 'Co'},
                  {label: "Married", value: 'Ma'},
                  {label: "Widow/er", value: 'Wi'},
                ]}
                required
              />
            </InputContainer>
          </AccordionItem>

          <AccordionItem title='Disability Information'>
            <p className='mb-2 text-gray-400'>(If disability is not available, add it here.)</p>
            <div className="flex gap-4 items-center">
              <div className="grow grid grid-cols-4 gap-4">
                <div>
                  <label htmlFor="" className='block text text-xs mb-2'>Type</label>
                  <Dropdown name="test" options={{
                    1: 'Speech',
                    2: 'Learning',
                    3: 'Intellectual',
                    4: 'Mental',
                    5: 'Visual',
                    6: 'Psychosocial',
                    7: 'Physical',
                    8: 'Hearing',
                    9: 'Cancer',
                    10: 'Rare Disease',
                  }} initialValue="Select Category" expand={true} />
                </div>
                
                <div className="col-span-3">
                  <label htmlFor="" className='block text text-xs mb-2'>Disability Name</label>
                  <input 
                    className='input input-sm w-full'
                    type="text"  
                    placeholder='(ex. Amputee)'
                  />
                </div>
              </div>

              <div className='mt-6'>
                <Button label="Save Disability"  />
              </div>
            </div>

            <p className='font-medium mb-2'>Disabilities</p>
            {/* {fields.map((field, index) => (
              <DisabilityContainer 
                key={field.id}
                index={index}
                control={control}
                remove={remove}
                disabled={ fields.length === 1 }
                disabilityOption={disabilitySelection}
              />
            ))} */}

            {fields.map((field, index) => (
              <DisabilityContainer 
                key={index}
                index={index}
                disabilityOption={disabilitySelection}
                remove={remove}
                disabled={fields.length === 1}
              />
            ))}
            

            <div className="flex justify-end mt-4">
              <Button label="Add Another Disability" onClick={() => append({ disability_cause: '', disability: '' })} />
            </div>
          </AccordionItem>

          <AccordionItem title='Residence'>
            <InputContainer>
              <TextInput
                label="House No. and Street"
                name="applicant.address.street_address"
                placeholder='ex. Purok 3B'
                required
              />

              <SelectInput 
                label="Barangay"
                name="applicant.address.barangay"
                options={barangays}
                required
              />

              <TextInput
                label="City"
                name="applicant.address.city"
                defaultValue="Tagum City"
                disabled
              />
            </InputContainer>

            <InputContainer>
              <TextInput 
                label="Province"
                name="applicant.address.province"
                defaultValue="Davao del Norte"
                disabled
              />
              
              <TextInput
                label="Region"
                name="applicant.address.region"
                defaultValue="XI"
                disabled
              />
            </InputContainer>
          </AccordionItem>

          <AccordionItem title="Contact Details">
            <InputContainer>
              <TextInput
                label="Landline"
                name="applicant.landline"
              />

              <TextInput
                label="Mobile No."
                name="applicant.mobile_no"
                placeholder='ex. 09123456789'
              />

              <EmailInput
                label="Email"
                name="applicant.email"
                placeholder='ex. juan@gmail.com'
              />
            </InputContainer>
          </AccordionItem>

          <AccordionItem title="Education">
            <InputContainer>
              <SelectInput
                label="Educational Attainment"
                name="applicant.educational_attainment"
                options={[
                  {label: 'None', value: 'No'},
                  {label: 'Kindergarten', value: 'Ki'},
                  {label: 'Elementary', value: 'El'},
                  {label: 'Junior High School', value: 'Jh'},
                  {label: 'Senior High School', value: 'Sh'},
                  {label: 'College', value: 'Co'},
                  {label: 'Vocational', value: 'Vo'},
                  {label: 'Post Graduate', value: 'Po'},
                ]}
                required
              />
            </InputContainer>
          </AccordionItem>

          <AccordionItem title="Employment">
            <InputContainer>
              <SelectInput
                label="Employment Status"
                name="applicant.employment.emp_status"
                options={[
                  {label: 'Employed', value: 'Em'},
                  {label: 'Unemployed', value: 'Un'},
                  {label: 'Self-employed', value: 'Se'}
                ]}
                required
              />

              <SelectInput
                label="Employment Category"
                name="applicant.employment.emp_category"
                options={[
                    {label: 'Government', value: 'Go'},
                    {label: 'Private', value: 'Pr'}
                ]}
                required
              />

              <SelectInput
                label="Employment Type"
                name="applicant.employment.emp_type"
                options={[
                  {label: 'Permanent/Regular', value: 'Re'},
                  {label: 'Seasonal', value: 'Se'},
                  {label: 'Casual', value: 'Ca'},
                  {label: 'Emergency', value: 'Em'},
                ]}
                required
              />
            </InputContainer>

            <InputContainer>
              <SelectInput
                label="Occupation"
                name="applicant.employment.occupation"
                options={occupations}
                required
              />

              <TextInput
                label="Other Occupation"
                name="applicant.employment.other_occupation"
              />
            </InputContainer>
          </AccordionItem>

          <AccordionItem title="Organization Information">
            <InputContainer>
              <TextInput
                label="Organization Affiliated"
                name="applicant.employment.organization.affiliated_org"
              />

              <TextInput
                label="Contact Person"
                name="application.employment.organization.contact_person"
              />

              <TextInput
                label="Office Address"
                name="applicant.employment.organization.office_address"
              />
            </InputContainer>

            <InputContainer>
              <TextInput
                label="Tel. No."
                name="applicant.employment.organization.tel_no"
              />
            </InputContainer>
          </AccordionItem>

          <AccordionItem title="ID Reference No.">
            <InputContainer>
              <TextInput 
                label="SSS No." 
                name="applicant.id_reference.sss_no" 
              />
              <TextInput
                label="GSIS No."
                name="applicant.id_reference.gsis_no"
              />
              <TextInput
                label="PAG-IBIG No."
                name="applicant.id_reference.pagibig_no"
              />
            </InputContainer>

            <InputContainer>
              <TextInput 
                label="PSN No." 
                name="applicant.id_reference.psn_no"  
              />

              <TextInput
                label="PhilHealth No."
                name="applicant.id_reference.philhealth_no"
              />
              <TextInput
                label="Other ID"
                name="applicant.id_reference.other_id"
              />
            </InputContainer>

            <InputContainer>
              <TextInput
                label="Other ID No."
                name="applicant.id_reference.other_id_no"
              />
            </InputContainer>
          </AccordionItem>

          <AccordionItem title="Family Background">
            <p className="font-semibold">Father</p>
            <InputContainer>
              <TextInput
                label="Last Name"
                name="family_details.father_lastname"
              />
              <TextInput
                label="Middle Name"
                name="family_details.father_middlename"
              />
              <TextInput
                label="First Name"
                name="family_details.father_firstname"
              />
            </InputContainer>

            <p className="font-semibold">Mother</p>
            <InputContainer>
              <TextInput
                label="Last Name"
                name="family_details.mother_lastname"
              />
              <TextInput
                label="Middle Name"
                name="family_details.mother_middlename"
              />
              <TextInput
                label="First Name"
                name="family_details.mother_firstname"
              />
            </InputContainer>

            <p className="font-semibold">Guardian</p>
            <InputContainer>
              <TextInput
                label="Last Name"
                name="family_details.guardian_lastname"
              />
              <TextInput
                label="Middle Name"
                name="family_details.guardian_middlename"
              />
              <TextInput
                label="First Name"
                name="family_details.guardian_firstname"
              />
            </InputContainer>
          </AccordionItem>

          <AccordionItem title="Documents">
            <InputContainer>
                <div>
                  <label htmlFor="" className='mb-2 block'>Photocopy of Medical Certificate</label>
                  <input type="file" className='file-input file-input-sm' />
                </div>

                <div>
                  <label htmlFor="" className='mb-2 block'>Voters ID / Certification / National ID</label>
                  <input type="file" className='file-input file-input-sm' />
                </div>

                <div>
                  <label htmlFor="" className='mb-2 block'>Duly Accomplished Application Form</label>
                  <input type="file" className='file-input file-input-sm' />
                </div>
            </InputContainer>
          </AccordionItem>

          <AccordionItem title="Processing Information">
            <RadioGroup
              label="Accomplished By"
              name="accomplished_by"
              options={[
                {label: "Applicant", value: "Ap"},
                {label: "Guardian", value: "Gu"},
                {label: "Representative", value: "Re"}
              ]}
              required
            />

            <InputContainer column="grid-col-1">
              <TextInput
                label="Accomplished by Full Name"
                name="accomplished_by_name"
                placeholder='ex. Juan Dela Cruz'
                required
              />
            </InputContainer>

            <p className="font-medium text-gray-500">(Certifying Physician)</p>
            <InputContainer>
              <TextInput
                label="Full Name"
                name="physician_name"
                placeholder='ex. Juan Dela Cruz'
              />
              <TextInput
                label="License No."
                name="physician_license_no"
                
              />
            </InputContainer>

            <InputContainer>
              <TextInput
                label="Processing Officer"
                name="processing_officer"
                placeholder='ex. Juan Dela Cruz'
                required
              />
              <TextInput
                label="Approving Officer"
                name="approving_officer"
                placeholder='ex. Juan Dela Cruz'
                required
              />
              <TextInput
                label="Encoder"
                name="encoder"
                placeholder='ex. Juan Dela Cruz'
                required
              />
            </InputContainer>

            <InputContainer>
              <TextInput
                label="Name of Reporting Unit"
                name="reporting_unit"
                placeholder='PDAO'
                required
              />
              <TextInput
                label="Control No."
                name="control_no"
                required
              />
            </InputContainer>
          </AccordionItem>

          {/* down button */}
          <div className='bg-white border-t-2 border-[#437057] fixed bottom-0 left-0 right-0 md:ms-64 p-2 flex justify-end gap-4'>
            <Link to='/application' className='btn bg-white text-gray-500'>Cancel</Link>
    
            <button type='submit' className='btn bg-[#437057] text-white'>Update</button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default ApplicationEditForm;

const InputContainer = ({
  children,
  column = "grid-cols-3",
}: {
  children?: React.ReactNode;
  column?: string;
}) => {
  // return <div className="flex gap-4">{children}</div>;
  return <div className={`grid ${column} gap-4`}>{children}</div>;
};