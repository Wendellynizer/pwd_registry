import React, { useState } from "react";
import { useNavigate } from "react-router";
import AccordionItem from "../components/AccordionItem";
import Input from "../components/Inputs/Input";
import Radio from "../components/Inputs/Radio";
import Dropdown from "../components/Inputs/Dropdown";
import Button from "../components/Buttons/Button";
import DisabilityContainer from "../components/DisabilityContainer";

const PWDForm = () => {
  const navigate = useNavigate();

  const [org, setOrg] = useState({
    affiliated_org: "",
    contact_person: "",
    office_address: "",
    tel_no: "",
  });

  const [famDetails, setFamDetails] = useState({
    father_lastname: "",
    father_firstname: "",
    father_middlename: "",
    mother_lastname: "",
    mother_firstname: "",
    mother_middlename: "",
    guardian_lastname: "",
    guardian_firstname: "",
    guardian_middlename: "",
  });

  const [disabilities, setDisabilities] = useState([
    {
      '_key': crypto.randomUUID() , 
      'disability_cause': '', 
      'disability_type_name': ''
    },
  ]);

  const addDisabilityField = () => {
    // setDisabilities([...disabilities, {'disability_cause': '', 'disability_type_name': ''}]);
     setDisabilities([
    ...disabilities,
    {
      _key: crypto.randomUUID(), // React-only
      disability_cause: '',
      disability_type_name: '',
    },
  ]);
  }

  const removeDisabilityField = (index: number) => {
    setDisabilities(disabilities.filter((_, i) => i !== index));
  }

  // Defines allowed field names for the disability object to ensure type safety when updating fields.
  type DisabilityField = 'disability_cause' | 'disability_type_name';

  // Updates a specific field of a disability entry at the given index
  // while keeping the rest of the state unchanged.
  const handleDisabilityChange = (
    index: number,
    field: DisabilityField,
    value: string
  ) => {
    
    setDisabilities(prev => prev.map((d, i) =>
      i === index ? {...d, [field]: value} : d
    ));
  };

  // contains all field data
  const [formData, setFormData] = useState({
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
      address: {
        street_address: "",
        barangay: "",
        city: "Tagum City",
        province: "Davao del Norte",
        region: "XI",
      }
    },
    applicant_disability: {},
    employment: {
      emp_status: "",
      emp_category: "",
      emp_type: "",
      occupation: "",
      other_occupation: "",
      organization: org,
    },
    family_details: famDetails,
    id_reference: {
      sss_no: "",
      gsis_no: "",
      pagibig_no: "",
      psn_no: "",
      philhealth_no: "",
      other_id_name: "",
      other_id: "",
    },
    accomplished_by: "",
    accomplished_name: "",
    physician_name: "",
    physician_license: "",
    processing_officer: "",
    approving_officer: "",
    encoder: "",
    reporting_unit: "",
    control_no: "",
  });

  // helper function to access nested object
  const setNestedValue = (obj: any, path: string, value: any) => {
    const keys = path.split(".");
    const lastKey = keys.pop()!;
    const deepRef = keys.reduce((acc, key) => {
      if (!acc[key]) acc[key] = {}; // Create missing structure
      return acc[key];
    }, obj);
    deepRef[lastKey] = value;
  }

  // handles changes on input fields by 
  // updating the value of each of the 
  // formData every input/change
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData(prev => {
      const next = structuredClone(prev);
      setNestedValue(next, name, value);
      return next;
    })

    // console.log(formData);
  };

  const handleOrgChange = (e: any) => {
    setOrg((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    console.log(org);
  };

  const handlFamilyChange = (e: any) => {
    setFamDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // submits the data through api
  const handleSubmit = (e: any) => {
    // e.preventDefault();    // assign the org and famDetail objects
    // to the formData before passing the data
    formData.employment.organization = org;
    formData.family_details = famDetails;

    const cleanedDisabilities = disabilities.map(({ _key, ...rest }) => rest);
    formData.applicant_disability = cleanedDisabilities;

    console.log(formData);
    // console.log(typeof(formData));
    navigate("/test", { state: formData });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <AccordionItem title="Personal Information">
          <InputContainer>
            <Input
              label="Last Name"
              fieldName="applicant.lastname"
              onChange={handleChange}
            />
            <Input
              label="Middle Name"
              fieldName="applicant.middlename"
              onChange={handleChange}
            />
            <Input
              label="First Name"
              fieldName="applicant.firstname"
              onChange={handleChange}
            />
          </InputContainer>

          <InputContainer>
            <Input label="Suffix" fieldName="applicant.suffix" onChange={handleChange} />
            <Input
              label="Birthdate"
              type="date"
              fieldName="applicant.birthdate"
              onChange={handleChange}
            />
            <Input
              label="Maiden Name"
              fieldName="applicant.maidenname"
              onChange={handleChange}
            />
          </InputContainer>

          <InputContainer>
            <Radio
              label="Gender"
              fieldName="applicant.gender"
              radioField={{ M: "Male", F: "Female" }}
              onChange={handleChange}
            />
            <Dropdown
              label="Civil Status"
              fieldName="applicant.civil_status"
              options={{
                Si: "Single",
                Se: "Separated",
                Co: "Cohabitation (live-in)",
                Ma: "Married",
                Wi: "Widow/er",
              }}
              onChange={handleChange}
            />
          </InputContainer>
        </AccordionItem>

        <AccordionItem title="Disability Information">
          <div className="flex gap-4 items-center">
            <div className="grow grid grid-cols-4 gap-4">
              <div>
                <Dropdown fieldName="" options={{
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
                <Input fieldName="" placeholder="(e.g. Amputation)" />
              </div>
            </div>
  
            <div>
              <Button label="Save Disability" />
            </div>
          </div>


          {disabilities.map((entry, index) => (
            <DisabilityContainer 
              key={entry._key}
              index={index} 
              cause="disability_cause"
              disabilityName="disability_type_name"
              onRemove={() => removeDisabilityField(index)}
              onChange={handleDisabilityChange}
              disabled={disabilities.length === 1}
            />
          ))}

          {/* <DisabilityContainer /> */}

          <div className="flex justify-end">
            <Button label="Add Another Disability" onClick={addDisabilityField} />
          </div>
        </AccordionItem>

        <AccordionItem title="Residence">
          <InputContainer>
            <Input
              label="House No. and Street"
              fieldName="applicant.address.street_address"
              onChange={handleChange}
            />
            <Dropdown
              label="Barangay"
              fieldName="applicant.address.barangay"
              options={{
                1: "Apokon",
              }}
              onChange={handleChange}
            />
            <Input
              label="City"
              fieldName="applicant.address.city"
              defaultValue="Tagum City"
              onChange={handleChange}
              disabled
            />
          </InputContainer>

          <InputContainer>
            <Input
              label="Province"
              fieldName="applicant.address.province"
              defaultValue="Davao del Norte"
              onChange={handleChange}
              disabled
            />
            <Input
              label="Region"
              fieldName="applicant.address.region"
              defaultValue="XI"
              onChange={handleChange}
              disabled
            />
          </InputContainer>
        </AccordionItem>

        <AccordionItem title="Contact Details">
          <InputContainer>
            <Input
              label="Landline"
              fieldName="applicant.landline"
              onChange={handleChange}
            />
            <Input
              label="Mobile No."
              fieldName="applicant.mobile_no"
              onChange={handleChange}
            />
            <Input
              label="Email"
              fieldName="applicant.email"
              type="email"
              onChange={handleChange}
            />
          </InputContainer>
        </AccordionItem>

        <AccordionItem title="Education">
          <InputContainer>
            <Dropdown
              label="Educational Attainment"
              fieldName="applicant.educational_attainment"
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
              onChange={handleChange}
            />
          </InputContainer>
        </AccordionItem>

        <AccordionItem title="Employment">
          <InputContainer>
            <Dropdown
              label="Employment Status"
              fieldName="employment.emp_status"
              options={{
                Em: "Employed",
                Un: "Unemployed",
                Se: "Self-employed",
              }}
              onChange={handleChange}
            />

            <Dropdown
              label="Employment Category"
              fieldName="employment.emp_category"
              options={{
                Go: "Government",
                Pr: "Private",
              }}
              onChange={handleChange}
            />

            <Dropdown
              label="Employment Type"
              fieldName="employment.emp_type"
              options={{
                Re: "Permanent/Regular",
                Se: "Seasonal",
                Ca: "Casual",
                Em: "Emergency",
              }}
              onChange={handleChange}
            />
          </InputContainer>

          <InputContainer>
            <Dropdown
              label="Occupation"
              fieldName="employment.occupation"
              options={{ 1: "Military" }}
              onChange={handleChange}
            />

            <Input
              label="Other Occupation"
              fieldName="employment.other_occupation"
              onChange={handleChange}
            />
          </InputContainer>
        </AccordionItem>

        <AccordionItem title="Organization Information">
          <InputContainer>
            <Input
              label="Organization Affiliated"
              fieldName="affiliated_org"
              onChange={handleOrgChange}
            />

            <Input
              label="Contact Person"
              fieldName="contact_person"
              onChange={handleOrgChange}
            />

            <Input
              label="Office Address"
              fieldName="office_address"
              onChange={handleOrgChange}
            />
          </InputContainer>

          <InputContainer>
            <Input
              label="Tel. No."
              fieldName="tel_no"
              onChange={handleOrgChange}
            />
          </InputContainer>
        </AccordionItem>

        <AccordionItem title="ID Reference No.">
          <InputContainer>
            <Input 
              label="SSS No." 
              fieldName="id_reference.sss_no" 
              onChange={handleChange} 
            />
            <Input
              label="GSIS No."
              fieldName="id_reference.gsis_no"
              onChange={handleChange}
            />
            <Input
              label="PAG-IBIG No."
              fieldName="id_reference.pagibig_no"
              onChange={handleChange}
            />
          </InputContainer>

          <InputContainer>
            <Input label="PSN No." fieldName="psn_no" onChange={handleChange} />
            <Input
              label="PhilHealth No."
              fieldName="id_reference.philhealth_no"
              onChange={handleChange}
            />
            <Input
              label="Other ID"
              fieldName="id_reference.other_id_name"
              onChange={handleChange}
            />
          </InputContainer>

          <InputContainer>
            <Input
              label="Other ID No."
              fieldName="id_reference.other_id"
              onChange={handleChange}
            />
          </InputContainer>
        </AccordionItem>

        <AccordionItem title="Family Background">
          <p className="font-semibold">Father</p>
          <InputContainer>
            <Input
              label="Last Name"
              fieldName="father_lastname"
              onChange={handlFamilyChange}
            />
            <Input
              label="Middle Name"
              fieldName="father_middlename"
              onChange={handlFamilyChange}
            />
            <Input
              label="First Name"
              fieldName="father_firstname"
              onChange={handlFamilyChange}
            />
          </InputContainer>

          <p className="font-semibold">Mother</p>
          <InputContainer>
            <Input
              label="Last Name"
              fieldName="mother_lastname"
              onChange={handlFamilyChange}
            />
            <Input
              label="Middle Name"
              fieldName="mother_middlename"
              onChange={handlFamilyChange}
            />
            <Input
              label="First Name"
              fieldName="mother_firstname"
              onChange={handlFamilyChange}
            />
          </InputContainer>

          <p className="font-semibold">Guardian</p>
          <InputContainer>
            <Input
              label="Last Name"
              fieldName="guardian_lastname"
              onChange={handlFamilyChange}
            />
            <Input
              label="Middle Name"
              fieldName="guardian_middlename"
              onChange={handlFamilyChange}
            />
            <Input
              label="First Name"
              fieldName="guardian_firstname"
              onChange={handlFamilyChange}
            />
          </InputContainer>
        </AccordionItem>

        <AccordionItem title="Documents"></AccordionItem>

        <AccordionItem title="Processing Information">
          <Radio
            label="Accomplished By"
            fieldName="accomplished_by"
            radioField={{
              Ap: "Applicant",
              Gu: "Guardian",
              Re: "Representative",
            }}
            onChange={handleChange}
          />

          <InputContainer column="grid-col-1">
            <Input
              label="Accomplished by Full Name"
              fieldName="accomplished_name"
              onChange={handleChange}
            />
          </InputContainer>

          <p className="font-semibold"> Certifying Physician</p>
          <InputContainer>
            <Input
              label="Full Name"
              fieldName="physician_name"
              onChange={handleChange}
            />
            <Input
              label="License No."
              fieldName="physician_license"
              onChange={handleChange}
            />
          </InputContainer>

          <InputContainer>
            <Input
              label="Processing Officer"
              fieldName="processing_officer"
              onChange={handleChange}
            />
            <Input
              label="Approving Officer"
              fieldName="approving_officer"
              onChange={handleChange}
            />
            <Input
              label="Encoder"
              fieldName="encoder"
              onChange={handleChange}
            />
          </InputContainer>

          <InputContainer>
            <Input
              label="Name of Reporting Unit"
              fieldName="reporting_unit"
              onChange={handleChange}
            />
            <Input
              label="Control No."
              fieldName="control_no"
              onChange={handleChange}
            />
          </InputContainer>
        </AccordionItem>

        <div className="mb-10"></div>

        <div className="fixed md:ps-64 px-2 py-2 bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 flex justify-end gap-4">
          <button type="button" className="btn btn-error">
            Cancel
          </button>

          <button type="submit" className="btn btn-success">
            Create
          </button>
        </div>
      </form>
    </>
  );
};

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



