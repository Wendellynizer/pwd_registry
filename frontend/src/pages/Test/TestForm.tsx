import { useState, useEffect } from "react";
import { fetchBarangays } from "../../api/modules/barangay";
import { fetchOccupations } from "../../api/modules/occupation";

function TestForm() {

    const [organization, setOrganization] = useState({
        affiliated_org: '',
        contact_person: '',
        office_address: '',
        tel_no: ''
    });

    const [familyDetails, setFamilyDetails] = useState({
        father_lastname: '',
        father_firstname: '',
        father_middlename: '',
        mother_lastname: '',
        mother_firstname: '',
        mother_middlename: '',
        guardian_lastname: '',
        guardian_firstname: '',
        guardian_middlename: '',
    });

    const [formData, setFormData] = useState({
        lastname: '',
        firstname: '',
        middlename: '',
        suffix: '',
        maidenname: '',
        birthdate: '',
        gender: '',
        civil_status: '',
        street_address: '',
        barangay: '',
        city: 'Tagum City',
        province: 'Davao del Norte',
        region: 'XI',
        landline: '',
        mobile_no: '',
        email: '',
        educational_attainment: 'No',
        emp_status: '',
        emp_category: '',
        emp_type: '',
        occupation: '',
        other_occupation: '',
        organization: organization,
        family_details: familyDetails,
        profile_image_path: '',
        apparent_disability: '',
        sss_no: '',
        gsis_no: '',
        pagibig_no: '',
        psn_no: '',
        philhealth_no: '',
        other_id_name: '',
        other_id: '',
        accomplished_by: '',
        accomplished_name: '',
    });

    
    const [barangays, setBarangays] = useState([]);
    const [occupations, setOccupations] = useState([]);

  // handle value submission
  const handleSubmit = async (e: any) => {
        e.preventDefault();

        // update the organization object
        const formToSubmit = {
            ...formData,
            organization: organization,
            family_details: familyDetails
        } 


        // submit form api
        console.log(formToSubmit);
  }

  // handles input fields changes
  const handleChange = (e: any) => {
    setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    }));

    console.log(formData);
  }

  const handleOrgChange = (e: any) => {
    setOrganization((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    }));

    console.log(organization);
  }

  const handleFamilyDetailChange = (e: any) => {
    setFamilyDetails((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    }));

    console.log(familyDetails);
  }

  // validate client-side input

  useEffect(() => {
    // load barangays
    const loadBarangays = async () => {
      try {
        const res = await fetchBarangays();
                setBarangays(res.data);
      } catch (err) {
        console.error("Error loading tasks:", err);
      }
    };

    // load barangays
    const loadOccupations = async () => {
      try {
        const res = await fetchOccupations();
                setOccupations(res.data);
      } catch (err) {
        console.error("Error loading tasks:", err);
      }
    };
    
    loadBarangays();
        loadOccupations();
  }, []);

  return (
    <>
      <h1>Form Here</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Personal Info */}
        <div>
            <label htmlFor="" className="label">Lastname</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="lastname" 
                className="input" 
                onChange={handleChange}
            />
        </div>

        <div>
            <label htmlFor="" className="label">Firstname</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="firstname" 
                className="input" 
                onChange={handleChange}
            />
        </div>

        <div>
            <label htmlFor="" className="label">Middlename</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="middlename" 
                className="input" 
                onChange={handleChange}
            />
        </div>

        <div>
            <label htmlFor="" className="label">Suffix</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="suffix" 
                className="input" 
                onChange={handleChange}
            />
        </div>

        <div>
            <label htmlFor="" className="label">Maiden Name</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="maidenname" 
                className="input" 
                onChange={handleChange}
            />
        </div>

        <div>
            <label htmlFor="" className="label">Suffix</label>
            <input 
                type="date" 
                placeholder="Type here"
                name="birthdate" 
                className="input" 
                onChange={handleChange}
            />
        </div>

        <div>
            <p>Gender</p>
            <input 
            type="radio" 
            name="gender" 
            value='Male'
            className="radio" 
            onChange={handleChange}/> Male

            <input 
            type="radio" 
            name="gender"
            value='Female'
            className="radio" 
            onChange={handleChange}/> Female
        </div>

        <div>
            <p>Civil Status</p>
            <input 
            type="radio" 
            name="gender" 
            value='Si'
            className="radio" 
            onChange={handleChange}/> Single

            <input 
            type="radio" 
            name="gender"
            value='Se'
            className="radio" 
            onChange={handleChange}/> Separated

            <input 
            type="radio" 
            name="gender"
            value='Co'
            className="radio" 
            onChange={handleChange}/> Cohabitation (live-in)

            <input 
            type="radio" 
            name="gender"
            value='Ma'
            className="radio" 
            onChange={handleChange}/> Married

            <input 
            type="radio" 
            name="gender"
            value='Wi'
            className="radio" 
            onChange={handleChange}/> Widow/er
        </div>

        {/* address */}
        <div>
            <p>Address</p>

            <label htmlFor="" className="label">House No and Street</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="street_address" 
                className="input" 
                onChange={handleChange}
            />

            <label htmlFor="" className="label">Barangay</label>
            <select 
            className="select" 
            name="barangay" 
            defaultValue="Select Barangay"
            onChange={handleChange}>
                <option disabled={true}>Select Barangay</option>
                {barangays.map((bgy: any, index) => (
                    <option value={bgy.id} key={index}>{bgy.barangay_name}</option>
                ))}
            </select>

            <label htmlFor="" className="label">City</label>
            <input 
                type="text" 
                placeholder="Type here"
                value={formData.city}
                name="city" 
                className="input" 
                onChange={handleChange}
                disabled
            />

            <label htmlFor="" className="label">Province</label>
            <input 
                type="text" 
                placeholder="Type here"
                value={formData.province}
                name="province" 
                className="input" 
                onChange={handleChange}
                disabled
            />

            <label htmlFor="" className="label">Region</label>
            <input 
                type="text" 
                placeholder="Type here"
                value={formData.region}
                name="region" 
                className="input" 
                onChange={handleChange}
                disabled
            />
        </div>

        <div>
            <label htmlFor="" className="label">Landline</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="landline" 
                className="input" 
                onChange={handleChange}
            />
        </div>

        <div>
            <label htmlFor="" className="label">Mobile no.</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="mobile_no" 
                className="input" 
                onChange={handleChange}
            />
        </div>

        <div>
            <label htmlFor="" className="label">Email</label>
            <input 
                type="email" 
                placeholder="Type here"
                name="email" 
                className="input" 
                onChange={handleChange}
            />
        </div>

        <div>
            <label htmlFor="" className="label">Educational Attainment</label>
            <select 
            className="select" 
            name="educational_attainment" 
            defaultValue="Select Barangay"
            onChange={handleChange}>
                <option value='No'>None</option>
                <option value='Ki'>Kindergarten</option>
                <option value='El'>Elementary</option>
                <option value='Jh'>Junior High School</option>
                <option value='Sh'>Senior High School</option>
                <option value='Co'>College</option>
                <option value='Vo'>Vocational</option>
                <option value='Po'>Post Graduate</option>
            </select>
        </div>

        <div>
            <label htmlFor="" className="label">Employment Status</label>
            <select 
            className="select" 
            name="emp_status" 
            defaultValue="Select Status"
            onChange={handleChange}>
                <option>Select Status</option>
                <option value='Em'>Employed</option>
                <option value='Un'>Unemployed</option>
                <option value='Se'>Self-employed</option>
            </select>
        </div>

        <div>
            <label htmlFor="" className="label">Employment Category</label>
            <select 
            className="select" 
            name="emmp_category" 
            defaultValue="Select Status"
            onChange={handleChange}>
                <option>Select Category</option>
                <option value='Go'>Government</option>
                <option value='Pr'>Private</option>
            </select>
        </div>

        <div>
            <label htmlFor="" className="label">Employment Type</label>
            <select 
            className="select" 
            name="emp_type" 
            defaultValue="Select Type"
            onChange={handleChange}>
                <option>Select Type</option>
                <option value='Re'>Permanent/Regular</option>
                <option value='Se'>Seasonal</option>
                <option value='Ca'>Casual</option>
                <option value='Em'>Emergency</option>
            </select>
        </div>

        <div>
            <label htmlFor="" className="label">Occupation</label>
            <select 
            className="select" 
            name="occupation" 
            defaultValue="Select Occupation"
            onChange={handleChange}>
                <option>Select Occupation</option>
                {occupations.map((occ:any, index) => (
                    <option value={occ.id} key={index}>{occ.occupation_name}</option>
                ))};
            </select>
        </div>

        <div>
            <label htmlFor="" className="label">Other Occupation</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="other_occupation" 
                className="input" 
                onChange={handleChange}
            />
        </div>

        <div className="flex flex-wrap gap-5">
            <label htmlFor="" className="label">Organization Information</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="affiliated_org" 
                className="input" 
                onChange={handleOrgChange}
            />

            <label htmlFor="" className="label">Contact Person</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="contact_person" 
                className="input" 
                onChange={handleOrgChange}
            />

            <label htmlFor="" className="label">Office Address</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="office_address" 
                className="input" 
                onChange={handleOrgChange}
            />

            <label htmlFor="" className="label">Tel No.</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="tel_no" 
                className="input" 
                onChange={handleOrgChange}
            />
        </div>

        <div className="flex gap-5">
            <label htmlFor="" className="label">Father Lastname</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="father_lastname" 
                className="input" 
                onChange={handleFamilyDetailChange}
            />

            <label htmlFor="" className="label">Father Firstname</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="father_firstname" 
                className="input" 
                onChange={handleFamilyDetailChange}
            />

            <label htmlFor="" className="label">Father Middlename</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="father_middlename" 
                className="input" 
                onChange={handleFamilyDetailChange}
            />
        </div>

        <div className="flex gap-5">
            <label htmlFor="" className="label">Mother Lastname</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="mother_lastname" 
                className="input" 
                onChange={handleFamilyDetailChange}
            />

            <label htmlFor="" className="label">Mother Firstname</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="mother_firstname" 
                className="input" 
                onChange={handleFamilyDetailChange}
            />

            <label htmlFor="" className="label">Mother Middlename</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="mother_middlename" 
                className="input" 
                onChange={handleFamilyDetailChange}
            />
        </div>

        <div className="flex gap-5">
            <label htmlFor="" className="label">Guardian Lastname</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="guardian_lastname" 
                className="input" 
                onChange={handleFamilyDetailChange}
            />

            <label htmlFor="" className="label">Guardian Firstname</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="guardian_firstname" 
                className="input" 
                onChange={handleFamilyDetailChange}
            />

            <label htmlFor="" className="label">Guardian Middlename</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="guardian_middlename" 
                className="input" 
                onChange={handleFamilyDetailChange}
            />
        </div>

        {/* id */}
        <div className="flex gap-5">
            <p>ID Reference No.</p>
            <label htmlFor="" className="label">SSS No.</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="sss_no" 
                className="input" 
                onChange={handleChange}
            />

            <label htmlFor="" className="label">GSIS No.</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="gsis_no" 
                className="input" 
                onChange={handleChange}
            />

            <label htmlFor="" className="label">Pagibig No.</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="pagibig_no" 
                className="input" 
                onChange={handleChange}
            />

            <label htmlFor="" className="label">PSN No.</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="psn_no" 
                className="input" 
                onChange={handleChange}
            />

            <label htmlFor="" className="label">Philhealth No.</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="philhealth_no" 
                className="input" 
                onChange={handleChange}
            />

             <label htmlFor="" className="label">Other ID Name</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="other_id_name" 
                className="input" 
                onChange={handleChange}
            />

             <label htmlFor="" className="label">Other ID No.</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="other_id" 
                className="input" 
                onChange={handleChange}
            />
        </div>

        {/* accomplished by */}
        <div className="flex gap-5">
            <label htmlFor="" className="label">Accomplished By</label>
            <select 
            className="select" 
            name="occupation" 
            defaultValue="Select Occupation"
            onChange={handleChange}>
                <option value="">Applicant</option>
                <option value="">Guardian</option>
                <option value="">Representative</option>
            </select>

            <label htmlFor="" className="label">Lastname</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="sss_no" 
                className="input" 
                onChange={handleChange}
            />

            <label htmlFor="" className="label">First Name</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="sss_no" 
                className="input" 
                onChange={handleChange}
            />

            <label htmlFor="" className="label">Middle Name</label>
            <input 
                type="text" 
                placeholder="Type here"
                name="sss_no" 
                className="input" 
                onChange={handleChange}
            />
        </div>

        {/* physician name */}
        {/* physician license */}

        {/* officers and offices */}

        {/* disability */}

        {/* documents */}


        <button type="submit" className="btn">Submit</button>
      </form>
    </>
  );
}

export default TestForm;