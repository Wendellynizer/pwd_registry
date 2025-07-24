import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router';
import { useFieldArray, useForm } from 'react-hook-form';
import AccordionItem from '../components/AccordionItem';
import Input from '../components/Inputs/Input';
import Radio from '../components/Inputs/Radio';
import Dropdown from '../components/Inputs/Dropdown';
import Button from '../components/Buttons/Button';
import DisabilityContainer from '../components/DisabilityContainer';
import { fetchBarangays } from '../api/modules/barangay';
import { fetchOccupations } from '../api/modules/occupation';
import { applicationCrud } from '../api/modules/application';
import { disabilityCrud } from '../api/modules/disability';

import defaultImage from '../assets/default.jpg';

const PWDForm = () => {

  const navigate = useNavigate();

  const { register, control, handleSubmit } = useForm<any>({
      defaultValues: {
        applicant: {
          lastname: "",
          middlename: "",
          firstname: "",
          suffix: "",
          maidenname: "",
          birthdate: "",
          gender: "",
          civil_status: "",
          landline: "",
          mobile_no: "",
          email: "",
          educational_attainment: "No",
          apparent_disability: "Y",
          address: {
            street_address: "",
            barangay: "",
            city: "Tagum City",
            province: "Davao del Norte",
            region: "XI",
          },
          employment: {
            emp_status: "",
            emp_category: "",
            emp_type: "",
            occupation: "",
            other_occupation: "",
            organization: {
              affiliated_org: "",
              contact_person: "",
              office_address: "",
              tel_no: "",
            },
          },
          id_reference: {
            sss_no: "",
            gsis_no: "",
            pagibig_no: "",
            psn_no: "",
            philhealth_no: "",
            other_id: "",
            other_id_no: "",
          },
          applicant_disabilities: [{}],
        },
        family_details: {
          father_lastname: "",
          father_firstname: "",
          father_middlename: "",
          mother_lastname: "",
          mother_firstname: "",
          mother_middlename: "",
          guardian_lastname: "",
          guardian_firstname: "",
          guardian_middlename: "",
        },
        registration_type: "Wa",
        registration_no: '123',
        accomplished_by: "",
        accomplished_by_name: "",
        physician_name: "",
        physician_license_no: "",
        processing_officer: "",
        approving_officer: "",
        encoder: "",
        reporting_unit: "",
        control_no: "",
      }
  });

  const onSubmit = async(formData: any) => {
    //  navigate("/test", { state: data });
    try {
      const data = await applicationCrud.create(formData);
      console.log('Created Successfull:', data)
    } catch(error) {
      console.error('Error Creating Application: ',error);
      return;
    }

    // console.log(formData)
    // navigate to application page
    navigate('/application');
  }

  const [disability, setDisability] = useState('');
  const [disabilityName, setDisabilityName] = useState('');

  const createDisability = async() => {
    const disabilityData = {
      disability_type: disability,
      disability_name: disabilityName
    };

    try {
      const reponse = await disabilityCrud.create(disabilityData);
      alert('Disability Added')
    } catch(error) {
      alert('Error Creating')
    }

    const getDisabilities = async() => {
      const response = await disabilityCrud.getAll();
      
      const disabilityObject = Object.fromEntries(
        response.map((item: any) => [item.id, item.disability_name])
      );
      
      setDisabilitySelection(disabilityObject);
    }

    getDisabilities();
  }

  const changeDisabilityValues = async(id: any) => {
    try {
      const data = await disabilityCrud.getAllByType(id);

      const disabilityObject = Object.fromEntries(
        data.map((item: any) => [item.id, item.disability_name])
      );
      
      setDisabilitySelection(disabilityObject);
    } catch(error) {
      alert('Error Finding')
    }
  }

  // use for dynamic fields in disabilities
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'applicant.applicant_disabilities'
  })

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

  useEffect(() => {
    // fetch barangays
    const getBarangay = async() => {
      // fetch barangay
      const response = await fetchBarangays();

      // turn array into object
      const barangayObject = Object.fromEntries(
        response.data.map((item: any) => [item.id, item.barangay_name])
      );

      setBarangays(barangayObject);
    }

    // fetch occupations
    const getOccupation = async() => {
      //fetch occupation
      const response = await fetchOccupations();
      
      const occupationObject = Object.fromEntries(
        response.data.map((item: any) => [item.id, item.occupation_name])
      );
      
      setOccupations(occupationObject);
    }

    // fetch disabilities 
    const getDisabilities = async() => {
      const response = await disabilityCrud.getAll();
      
      const disabilityObject = Object.fromEntries(
        response.map((item: any) => [item.id, item.disability_name])
      );
      
      setDisabilitySelection(disabilityObject);
    }

    getBarangay();
    getOccupation();
    getDisabilities();
  }, []);

  useEffect(() => {

  }, []);

  return (
    <div className='p-5'>
      <p className='text-lg mb-4 font-semibold'>Registration Form</p>
      <form onSubmit={handleSubmit(onSubmit)} method='POST' className='pb-8'>
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
            <Input 
              label='Last Name'
              name='applicant.lastname'
              register={register}
              placeholder='ex. Dela Cruz'
            />

            <Input 
              label='First Name'
              name='applicant.firstname'
              register={register}
              placeholder='ex. Juan'
            />

            <Input 
              label='Middle Name'
              name='applicant.middlename'
              register={register}
              required={false}
              placeholder='ex. Magsayo'
            />
          </InputContainer>

          <InputContainer>
            <Input 
              label='Suffix'
              name='applicant.suffix'
              register={register}
              placeholder='ex. Jr, Sr., III'
            />

            <Input 
              type='date'
              label='Birthdate'
              name='applicant.birthdate'
              register={register}
            />

            <Input 
              label='Maiden Name'
              name='applicant.maidenname'
              register={register}
            />
          </InputContainer>

          <InputContainer>
            <Radio 
              label='Gender'
              register={register}
              name='applicant.gender'
              radioField={{ M: 'Male', F: 'Female'}}
            />

            <Dropdown 
              label='Civil Status'
              name='applicant.civil_status'
              register={register}
              options={{
                Si: "Single",
                Se: "Separated",
                Co: "Cohabitation (live-in)",
                Ma: "Married",
                Wi: "Widow/er",
              }}
              expand
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
                  7: 'Speech',
                  3: 'Learning',
                  2: 'Intellectual',
                  4: 'Mental',
                  8: 'Visual',
                  6: 'Psychosocial',
                  5: 'Physical',
                  1: 'Hearing',
                  9: 'Cancer',
                  10: 'Rare Disease',
                }} 
                initialValue="Select Category" 
                expand={true} 
                onChange={(e) => {
                  setDisability(e.target.value)
                  changeDisabilityValues(e.target.value)}
                }/>
              </div>
              
              <div className="col-span-3">
                <label htmlFor="" className='block text text-xs mb-2'>Disability Name</label>
                <input 
                  className='input input-sm w-full'
                  type="text"  
                  placeholder='(ex. Amputee)'
                  onChange={(e) => setDisabilityName(e.target.value)}
                />
              </div>
            </div>

            <div className='mt-6'>
              <Button label="Save Disability" onClick={createDisability} />
            </div>
          </div>

          <p className='font-medium mb-2'>Disabilities</p>
          {fields.map((field, index) => (
            <DisabilityContainer 
              key={field.id}
              index={index}
              control={control}
              remove={remove}
              disabled={ fields.length === 1 }
              disabilityOption={disabilitySelection}
            />
          ))}

          <div className="flex justify-end mt-4">
            <Button label="Add Another Disability" onClick={() => append({ disability_cause: '', disability: '' })} />
          </div>
        </AccordionItem>

        <AccordionItem title='Residence'>
          <InputContainer>
            <Input
              label="House No. and Street"
              name="applicant.address.street_address"
              register={register}
              placeholder='ex. Purok 3B'
            />

            <Dropdown
              label="Barangay"
              name="applicant.address.barangay"
              options={barangays}
              register={register}
            />

            <Input
              label="City"
              name="applicant.address.city"
              defaultValue="Tagum City"
              register={register}
              disabled
            />
          </InputContainer>

          <InputContainer>
            <Input
              label="Province"
              name="applicant.address.province"
              defaultValue="Davao del Norte"
              register={register}
              disabled
            />
            <Input
              label="Region"
              name="applicant.address.region"
              defaultValue="XI"
              register={register}
              disabled
            />
          </InputContainer>
        </AccordionItem>

        <AccordionItem title="Contact Details">
          <InputContainer>
            <Input
              label="Landline"
              name="applicant.landline"
              register={register}
            />
            <Input
              label="Mobile No."
              name="applicant.mobile_no"
              register={register}
              placeholder='ex. 09123456789'
            />
            <Input
              label="Email"
              name="applicant.email"
              type="email"
              register={register}
              placeholder='ex. juan@gmail.com'
            />
          </InputContainer>
        </AccordionItem>

        <AccordionItem title="Education">
          <InputContainer>
            <Dropdown
              label="Educational Attainment"
              name="applicant.educational_attainment"
              options={{
                No: "None",
                Ki: "Kindergarten",
                El: "Elementary",
                Jh: "Junior High School",
                Sh: "Senior High School",
                Co: "College",
                Vo: "Vocational",
                Po: "Post Graduate",
              }}
              register={register}
            />
          </InputContainer>
        </AccordionItem>

        <AccordionItem title="Employment">
          <InputContainer>
            <Dropdown
              label="Employment Status"
              name="applicant.employment.emp_status"
              options={{
                Em: "Employed",
                Un: "Unemployed",
                Se: "Self-employed",
              }}
              register={register}
            />

            <Dropdown
              label="Employment Category"
              name="applicant.employment.emp_category"
              options={{
                Go: "Government",
                Pr: "Private",
              }}
              register={register}
            />

            <Dropdown
              label="Employment Type"
              name="applicant.employment.emp_type"
              options={{
                Re: "Permanent/Regular",
                Se: "Seasonal",
                Ca: "Casual",
                Em: "Emergency",
              }}
              register={register}
            />
          </InputContainer>

          <InputContainer>
            <Dropdown
              label="Occupation"
              name="applicant.employment.occupation"
              options={occupations}
              register={register}
            />

            <Input
              label="Other Occupation"
              name="applicant.employment.other_occupation"
              register={register}
              disabled={!otherSelected}
            />
          </InputContainer>
        </AccordionItem>

        <AccordionItem title="Organization Information">
          <InputContainer>
            <Input
              label="Organization Affiliated"
              name="applicant.employment.organization.affiliated_org"
              register={register}
            />

            <Input
              label="Contact Person"
              name="application.employment.organization.contact_person"
              register={register}
            />

            <Input
              label="Office Address"
              name="applicant.employment.organization.office_address"
              register={register}
            />
          </InputContainer>

          <InputContainer>
            <Input
              label="Tel. No."
              name="applicant.employment.organization.tel_no"
              register={register}
            />
          </InputContainer>
        </AccordionItem>

        <AccordionItem title="ID Reference No.">
          <InputContainer>
            <Input 
              label="SSS No." 
              name="applicant.id_reference.sss_no" 
               register={register}
            />
            <Input
              label="GSIS No."
              name="applicant.id_reference.gsis_no"
              register={register}
            />
            <Input
              label="PAG-IBIG No."
              name="applicant.id_reference.pagibig_no"
              register={register}
            />
          </InputContainer>

          <InputContainer>
            <Input 
              label="PSN No." 
              name="applicant.id_reference.psn_no" 
              register={register} 
            />

            <Input
              label="PhilHealth No."
              name="applicant.id_reference.philhealth_no"
              register={register}
            />
            <Input
              label="Other ID"
              name="applicant.id_reference.other_id"
              register={register}
            />
          </InputContainer>

          <InputContainer>
            <Input
              label="Other ID No."
              name="applicant.id_reference.other_id_no"
              register={register}
            />
          </InputContainer>
        </AccordionItem>

        <AccordionItem title="Family Background">
          <p className="font-semibold">Father</p>
          <InputContainer>
            <Input
              label="Last Name"
              name="family_details.father_lastname"
              register={register}
            />
            <Input
              label="Middle Name"
              name="family_details.father_middlename"
              register={register}
            />
            <Input
              label="First Name"
              name="family_details.father_firstname"
              register={register}
            />
          </InputContainer>

          <p className="font-semibold">Mother</p>
          <InputContainer>
            <Input
              label="Last Name"
              name="family_details.mother_lastname"
              register={register}
            />
            <Input
              label="Middle Name"
              name="family_details.mother_middlename"
              register={register}
            />
            <Input
              label="First Name"
              name="family_details.mother_firstname"
              register={register}
            />
          </InputContainer>

          <p className="font-semibold">Guardian</p>
          <InputContainer>
            <Input
              label="Last Name"
              name="family_details.guardian_lastname"
              register={register}
            />
            <Input
              label="Middle Name"
              name="family_details.guardian_middlename"
              register={register}
            />
            <Input
              label="First Name"
              name="family_details.guardian_firstname"
              register={register}
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
          <Radio
            label="Accomplished By"
            name="accomplished_by"
            radioField={{
              Ap: "Applicant",
              Gu: "Guardian",
              Re: "Representative",
            }}
            register={register}
          />

          <InputContainer column="grid-col-1">
            <Input
              label="Accomplished by Full Name"
              name="accomplished_by_name"
              register={register}
              placeholder='ex. Juan Dela Cruz'
            />
          </InputContainer>

          <p className="font-semibold"> Certifying Physician</p>
          <InputContainer>
            <Input
              label="Full Name"
              name="physician_name"
              register={register}
              placeholder='ex. Juan Dela Cruz'
            />
            <Input
              label="License No."
              name="physician_license_no"
              register={register}
              
            />
          </InputContainer>

          <InputContainer>
            <Input
              label="Processing Officer"
              name="processing_officer"
              register={register}
              placeholder='ex. Juan Dela Cruz'
            />
            <Input
              label="Approving Officer"
              name="approving_officer"
              register={register}
              placeholder='ex. Juan Dela Cruz'
            />
            <Input
              label="Encoder"
              name="encoder"
              register={register}
              placeholder='ex. Juan Dela Cruz'
            />
          </InputContainer>

          <InputContainer>
            <Input
              label="Name of Reporting Unit"
              name="reporting_unit"
              register={register}
              placeholder='PDAO'
            />
            <Input
              label="Control No."
              name="control_no"
              register={register}
            />
          </InputContainer>
        </AccordionItem>

        {/* down button */}
        <div className='bg-white border-t-2 border-[#437057] fixed bottom-0 left-0 right-0 md:ms-64 p-2 flex justify-end gap-4'>
          <Link to='/application' className='btn bg-white text-gray-500'>Cancel</Link>
  
          <button type='submit' className='btn bg-[#437057] text-white'>Create</button>
        </div>
      </form>
    </div>
  )
}

export default PWDForm;

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