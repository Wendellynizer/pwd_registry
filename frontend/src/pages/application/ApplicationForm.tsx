import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

import defaultImage from "@assets/images/default.png";
import AccordionItem from "@/components/custom/AccordionItem";
import Dropdown from "@/components/inputs/Dropdown";
import Button from "@/components/common/buttons/Button";
import DisabilityContainer from "@components/custom/DisabilityContainer";
import TextInput from "@/components/common/form-context-inputs/TextInput";
import SelectInput from "@/components/common/form-context-inputs/SelectInput";
import DateInput from "@/components/common/form-context-inputs/DateInput";
import RadioGroup from "@/components/common/form-context-inputs/Radio";
import EmailInput from "@/components/common/form-context-inputs/Emailinput";

import {
  barangayService,
  occupationService,
  applicationService,
  disabilityService,
} from "@/services";

const ApplicationForm = () => {
  const navigate = useNavigate();

  const methods = useForm({
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
      registration_no: "123",
      accomplished_by: "",
      accomplished_by_name: "",
      physician_name: "",
      physician_license_no: "",
      processing_officer: "",
      approving_officer: "",
      encoder: "",
      reporting_unit: "",
      control_no: "",
    },
  });

  const { reset, control } = methods;

  // submit application
  const onSubmit = async (formData: any) => {
    try {
      const data = await applicationService.create(formData);
      console.log("Created Successfull:", data);
    } catch (error) {
      console.error("Error Creating Application: ", error);
      return;
    }

    // navigate to application page
    navigate("/application");
  };

  const [disability, setDisability] = useState("");
  const [disabilityName, setDisabilityName] = useState("");

  // use for dynamic fields in disabilities
  const { fields, append, remove } = useFieldArray({
    control,
    name: "applicant.applicant_disabilities",
  });

  const [barangays, setBarangays] = useState([]);
  const [occupations, setOccupations] = useState([]);
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

  const otherOccupationSelected = () => {};

  useEffect(() => {
    const getBarangay = async () => {
      // fetch barangay
      const response = await barangayService.getAll();

      const barangayOptions = response.map((item: any) => ({
        value: item.id,
        label: item.barangay_name,
      }));

      setBarangays(barangayOptions);
    };

    // fetch occupations
    const getOccupation = async () => {
      //fetch occupation
      const response = await occupationService.getAll();

      const occupationOptions = response.map((item: any) => ({
        value: item.id,
        label: item.occupation_name,
      }));

      setOccupations(occupationOptions);
    };

    // fetch disabilities
    const getDisabilities = async () => {
      const response = await disabilityService.getAll();

      const disabilityObject = Object.fromEntries(
        response.map((item: any) => [item.id, item.disability_name])
      );

      setDisabilitySelection(disabilityObject);
    };

    getBarangay();
    getOccupation();
    getDisabilities();
  }, []);

  return (
    <div className="p-5">
      <p className="text-lg mb-4 font-semibold">Registration Form</p>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          method="POST"
          className="pb-8"
      >
          <AccordionItem title="Profile" opened={false}>
            <div className="flex flex-col">
              <label htmlFor="" className="block mb-2 text-gray-400">
                Add a Profile Picture
              </label>
              <div className="avatar">
                <div className="w-34 rounded">
                  <img src={previewURL || defaultImage} alt="Profile Preview" />
                </div>
              </div>
            </div>

            <div className="space-x-2">
              <input
                className="file-input file-input-sm"
                type="file"
                accept="image/*"
                onChange={handleProfileFileChange}
                ref={fileInputRef}
              />

              <button
                type="button"
                className="btn btn-sm"
                onClick={(e: any) => {
                  setPreviewURL(null);
                  setSelectedImage(null);

                  if (fileInputRef.current) {
                    fileInputRef.current.value = null; // clear input field
                  }
                }}
              >
                Clear
              </button>
            </div>
          </AccordionItem>

          <AccordionItem title="Personal Information">
            <InputContainer>
              <TextInput label="Last Name" name="applicant.lastname" required />

              <TextInput
                label="First Name"
                name="applicant.firstname"
                required
              />

              <TextInput label="Middle Name" name="applicant.middlename" />
            </InputContainer>

            <InputContainer>
              <TextInput label="Suffix" name="applicant.suffix" />

              <DateInput
                label="Birthdate"
                name="applicant.birthdate"
                required
              />

              <TextInput label="Maiden Name" name="applicant.maidenname" />
            </InputContainer>

            <InputContainer>
              <RadioGroup
                label="Gender"
                name="applicant.gender"
                options={[
                  { label: "Male", value: "M" },
                  { label: "Female", value: "F" },
                ]}
                required
              />

              <SelectInput
                label="Civil Status"
                name="applicant.civil_status"
                selectOptions={[
                  { label: "Single", value: "Si" },
                  { label: "Separated", value: "Se" },
                  { label: "Cohabitation (live-in)", value: "Co" },
                  { label: "Married", value: "Ma" },
                  { label: "Widow/er", value: "Wi" },
                ]}
                required
              />
            </InputContainer>
          </AccordionItem>

          <AccordionItem title="Disability Information">
            <p className="mb-2 text-gray-400">
              (If disability is not available, add it here.)
            </p>
            <div className="flex gap-4 items-center">
              <div className="grow grid grid-cols-4 gap-4">
                <div>
                  <label htmlFor="" className="block text text-xs mb-2">
                    Type
                  </label>
                  <Dropdown
                    name="test"
                    options={{
                      1: "Speech",
                      2: "Learning",
                      3: "Intellectual",
                      4: "Mental",
                      5: "Visual",
                      6: "Psychosocial",
                      7: "Physical",
                      8: "Hearing",
                      9: "Cancer",
                      10: "Rare Disease",
                    }}
                    initialValue="Select Category"
                    expand={true}
                  />
                </div>

                <div className="col-span-3">
                  <label htmlFor="" className="block text text-xs mb-2">
                    Disability Name
                  </label>
                  <input
                    className="input input-sm w-full"
                    type="text"
                    placeholder="(ex. Amputee)"
                  />
                </div>
              </div>

              <div className="mt-6">
                <Button label="Save Disability" />
              </div>
            </div>

            <p className="font-medium mb-2">Disabilities</p>
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
              <Button
                label="Add Another Disability"
                onClick={() => append({ disability_cause: "", disability: "" })}
              />
            </div>
          </AccordionItem>

          <AccordionItem title="Residence">
            <InputContainer>
              <TextInput
                label="House No. and Street"
                name="applicant.address.street_address"
                placeholder="ex. Purok 3B"
                required
              />

              <SelectInput
                label="Barangay"
                name="applicant.address.barangay"
                selectOptions={barangays}
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
              <TextInput label="Landline" name="applicant.landline" />

              <TextInput
                label="Mobile No."
                name="applicant.mobile_no"
                placeholder="ex. 09123456789"
              />

              <EmailInput
                label="Email"
                name="applicant.email"
                placeholder="ex. juan@gmail.com"
              />
            </InputContainer>
          </AccordionItem>

          <AccordionItem title="Education">
            <InputContainer>
              <SelectInput
                label="Educational Attainment"
                name="applicant.educational_attainment"
                selectOptions={[
                  { label: "None", value: "No" },
                  { label: "Kindergarten", value: "Ki" },
                  { label: "Elementary", value: "El" },
                  { label: "Junior High School", value: "Jh" },
                  { label: "Senior High School", value: "Sh" },
                  { label: "College", value: "Co" },
                  { label: "Vocational", value: "Vo" },
                  { label: "Post Graduate", value: "Po" },
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
                selectOptions={[
                  { label: "Employed", value: "Em" },
                  { label: "Unemployed", value: "Un" },
                  { label: "Self-employed", value: "Se" },
                ]}
                required
              />

              <SelectInput
                label="Employment Category"
                name="applicant.employment.emp_category"
                selectOptions={[
                  { label: "Government", value: "Go" },
                  { label: "Private", value: "Pr" },
                ]}
                required
              />

              <SelectInput
                label="Employment Type"
                name="applicant.employment.emp_type"
                selectOptions={[
                  { label: "Permanent/Regular", value: "Re" },
                  { label: "Seasonal", value: "Se" },
                  { label: "Casual", value: "Ca" },
                  { label: "Emergency", value: "Em" },
                ]}
                required
              />
            </InputContainer>

            <InputContainer>
              <SelectInput
                label="Occupation"
                name="applicant.employment.occupation"
                selectOptions={occupations}
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
              <TextInput label="SSS No." name="applicant.id_reference.sss_no" />
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
              <TextInput label="PSN No." name="applicant.id_reference.psn_no" />

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
                <label htmlFor="" className="mb-2 block">
                  Photocopy of Medical Certificate
                </label>
                <input type="file" className="file-input file-input-sm" />
              </div>

              <div>
                <label htmlFor="" className="mb-2 block">
                  Voters ID / Certification / National ID
                </label>
                <input type="file" className="file-input file-input-sm" />
              </div>

              <div>
                <label htmlFor="" className="mb-2 block">
                  Duly Accomplished Application Form
                </label>
                <input type="file" className="file-input file-input-sm" />
              </div>
            </InputContainer>
          </AccordionItem>

          <AccordionItem title="Processing Information">
            <RadioGroup
              label="Accomplished By"
              name="accomplished_by"
              options={[
                { label: "Applicant", value: "Ap" },
                { label: "Guardian", value: "Gu" },
                { label: "Representative", value: "Re" },
              ]}
              required
            />

            <InputContainer column="grid-col-1">
              <TextInput
                label="Accomplished by Full Name"
                name="accomplished_by_name"
                placeholder="ex. Juan Dela Cruz"
                required
              />
            </InputContainer>

            <p className="font-medium text-gray-500">(Certifying Physician)</p>
            <InputContainer>
              <TextInput
                label="Full Name"
                name="physician_name"
                placeholder="ex. Juan Dela Cruz"
              />
              <TextInput label="License No." name="physician_license_no" />
            </InputContainer>

            <InputContainer>
              <TextInput
                label="Processing Officer"
                name="processing_officer"
                placeholder="ex. Juan Dela Cruz"
                required
              />
              <TextInput
                label="Approving Officer"
                name="approving_officer"
                placeholder="ex. Juan Dela Cruz"
                required
              />
              <TextInput
                label="Encoder"
                name="encoder"
                placeholder="ex. Juan Dela Cruz"
                required
              />
            </InputContainer>

            <InputContainer>
              <TextInput
                label="Name of Reporting Unit"
                name="reporting_unit"
                placeholder="PDAO"
                required
              />
              <TextInput label="Control No." name="control_no" required />
            </InputContainer>
          </AccordionItem>

          {/* down button */}
          <div className="bg-white border-t-2 border-[#437057] fixed bottom-0 left-0 right-0 md:ms-64 p-2 flex justify-end gap-4">
            <Link to="/application" className="btn bg-white text-gray-500">
              Cancel
            </Link>

            <button type="submit" className="btn bg-[#437057] text-white">
              Create Application
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ApplicationForm;

const InputContainer = ({
  children,
  column = "grid-cols-3",
}: {
  children?: React.ReactNode;
  column?: string;
}) => {
  return <div className={`grid ${column} gap-4`}>{children}</div>;
};
