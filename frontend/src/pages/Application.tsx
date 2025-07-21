import { ClipboardPlus, Eye, ListFilter, Search, SquarePen, Trash2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { applicationCrud } from '../api/modules/application';
import { 
  Table,
  TableHead,
  TableBody,
  TableHeader,
  TableRow,
  TableCell
} from '../components/Table';
// import Input from '../components/Inputs/Input';

const Application = () => {

  const [applications, setApplications] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const [filters, setFilters] = useState({
    date_from: '',
    date_to: '',
    disability_type: '',
    status: ''
  });

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  }

  const applyFilters = async() => {
    const data = await applicationCrud.getAll(filters);
    setApplications(data);
  }

  const header = [
    'Reg No.', 'Last Name', 'First Name',
    'Middle Name', 'Disability Type', 'Date Applied', 'Status', 'Actions'
  ];

  useEffect(() => {
    const loadApplications = async () => {
      const data = await applicationCrud.getAll();
      setApplications(data);
      console.log(data);
    }

    loadApplications();
  }, []);

  return (
    <>
      <div className='space-y-4'>
        <div>
          <p className='text-xl font-semibold'>PWD Application</p>
        </div>

        <div className='flex justify-end'>
          <Link to='/pwd-form'
          className='btn btn-sm bg-[#437057] text-white'>
            <ClipboardPlus size={20} />
            <p>Create Application</p>
          </Link>
        </div>

        {/* search and filter */}
        <div className='flex justify-between items-center'>
          {/* searchbar */}
          <label className="input input-sm w-80">
            <Search opacity={0.5} size={20} />
            <input type="search" required placeholder="Search" />
          </label>

          {/* button */}
          <div>
            <button className='btn btn-sm border-gray-300 font-normal' onClick={toggleFilter}>
              Filter
              <ListFilter size={18}/>
            </button>

            {showFilter && <AdvanceFilter 
              closeFilter={toggleFilter}
              filters={filters}
              setFilters={setFilters}
              applyFilters={applyFilters}
            />}
          </div>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              {header.map((name, index) => (
                  <TableHeader key={index}>{name}</TableHeader>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {applications.map((app: any) => (
              <TableRow key={app.id}>
                <TableCell>{app.registration_no}</TableCell>
                <TableCell>{app.applicant.lastname}</TableCell>
                <TableCell>{app.applicant.firstname}</TableCell>
                <TableCell>{app.applicant.middlename}</TableCell>
                <TableCell>
                  <div className='space-x-2'>
                    {app.applicant.applicant_disabilities.map((dis: any, index: any) => (
                      <span className='badge badge-sm border-gray-200 rounded-sm' key={index}>{dis.disability_details.disability_type.disability_type_name}</span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{app.date_applied}</TableCell>
                <TableCell>
                  <TableBadge text={app.status} />
                </TableCell>
                <TableCell>
                  <div className='flex justify-around items-center'>
                    <Link to={`/application/`+app.id} className='text-green-600'><Eye /></Link>
                    <Link to='' className='text-blue-400'><SquarePen /></Link>
                    <Link to='' className='text-red-400'><Trash2 /></Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        {/* should i add pagination component? */}
       <div className='mt-4 flex justify-between'>
         {/* record count */}
         <p className='text-sm'>Showing <span className='font-semibold'>1 - 3</span>  of <span className='font-semibold'>3</span> Entries</p>

         <div className='flex items-center gap-4'>
           {/* rows per page */}
           <div className='flex items-center gap-2'>
             <p className='text-sm'>Row per page</p>

             <select defaultValue="10" className="select select-sm w-fit">
               <option value={10}>10</option>
               <option value={25}>25</option>
             </select>
           </div>

           {/* pagination buttons */}
           <div className="join gap-2">
             <button className="join-item btn btn-sm">{'<'}</button>
             <button className="join-item bg-[#437057] border-[#437057] text-white btn btn-sm btn-active">1</button>
             <button className="join-item btn btn-sm">{'>'}</button>
           </div>
         </div>
       </div>
      </div>
    </>
  )
}

export default Application;

interface AdvanceFilterProps {
  closeFilter: () => void;
  filters: {
    date_from: string;
    date_to: string;
    disability_type: string;
    status: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  applyFilters: () => void;
}

const AdvanceFilter = ({
  closeFilter,
  filters,
  setFilters,
  applyFilters
}: AdvanceFilterProps) => {

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFilters((prev: any) => ({ ...prev, [name]: value }));
  };

  const clearFields = (...fields: any) => {
    setFilters((prev: any) => {
      const updated = { ...prev };
      fields.forEach((field: any) => (updated[field] = ''));
      return updated;
    });
  };

  return (
    <div className='bg-white border border-gray-300 rounded-sm px-2 pt-2 pb-4 text-sm absolute top-52 right-5 z-10 transition-all w-90'>
      <div className='flex justify-between items-center px-2 mb-6'>
        <p>Advance Filter</p>
        <div className='flex items-center gap-4'>
          <button type='button' className='cursor-pointer' onClick={closeFilter}>
            <X />
          </button>
        </div>
      </div>

      <div className='px-2'>
        <div className='flex justify-between items-center'>
          <p className='opacity-50'>Date Range</p>
          <button onClick={() => clearFields('date_from', 'date_to')} className='text-xs text-blue-500 hover:underline'>Clear</button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className='flex flex-col'>
            <label>From</label>
            <input
              type='date'
              name='date_from'
              value={filters.date_from}
              onChange={handleChange}
              className='input input-sm'
            />
          </div>

          <div className='flex flex-col'>
            <label>To</label>
            <input
              type='date'
              name='date_to'
              value={filters.date_to}
              onChange={handleChange}
              className='input input-sm'
            />
          </div>
        </div>

        <div className='mt-4'>
          <div className='flex justify-between items-center'>
            <p className='opacity-50'>Disability Type</p>
            <button onClick={() => clearFields('disability_type')} className='text-blue-400 text-xs'>Clear</button>
          </div>
          <select name='disability_type' value={filters.disability_type} onChange={handleChange} className='select select-sm mt-2 w-full'>
            <option value="">All</option>
            <option value="7">Speech and Language</option>
            <option value="8">Visual</option>
            <option value="3">Learning</option>
            <option value="5">Physical</option>
            <option value="6">Psychosocial</option>
            <option value="4">Mental</option>
            <option value="2">Intellectual</option>
            <option value="1">Hearing</option>
            <option value="10">Rare Disease</option>
            <option value="9">Cancer</option>
          </select>
        </div>

        <div className='mt-4'>
          <div className='flex justify-between items-center'>
            <p className='opacity-50'>Status</p>
            <button onClick={() => clearFields('status')} className='text-blue-400 text-xs'>Clear</button>
          </div>
          <select name='status' value={filters.status} onChange={handleChange} className='select select-sm mt-2 w-full'>
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
            <option value="Approved">Approved</option>
          </select>
        </div>

        <button type="button" className='btn btn-sm w-full bg-[#437057] text-white mt-4' onClick={applyFilters}>
          Apply
        </button>
      </div>
    </div>
  );
};

const TableBadge = ({text}: {text: string | number}) => {

  let badgeColor = 'badge-warning';

  if(text == 'Pending') {
    badgeColor = 'badge-warning';
  } else if(text == 'Rejected') {
    badgeColor = 'badge-error';
  } else if(text == 'Approved') {
    badgeColor = 'badge-success';
  } else {
    badgeColor = '';
  }

  return(
    <p className={`badge badge-sm rounded-sm ${badgeColor}`}>{text}</p>
  )
}