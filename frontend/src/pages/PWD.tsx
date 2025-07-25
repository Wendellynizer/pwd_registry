import { ArrowDownUp, ClipboardPlus, Eye, ListFilter, Search, SquarePen, Trash2, X } from 'lucide-react';
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
import axios from 'axios';
import { baseURL } from '../api';
import Container from '../components/Container';
// import Input from '../components/Inputs/Input';

const PWD = () => {

  const [pwds, setPwds] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  }

  const header = [
    'Issued PWD ID', 'ID Status', 'Last Name	', 'First Name',
    'Middle Name', 'Disability Type', 'Date Applied', 'Actions'
  ];

  useEffect(() => {
    const loadPWD = async() => {
      const response = await axios.get(
        `${baseURL}pwds/`
      );

      setPwds(response.data);

      console.log(response.data);
    }

    loadPWD();
  }, []);

  return (
    <div className='p-5 space-y-4'>
        {/* <div className='flex justify-end'>
          <Link to='/pwd-form'
          className='btn btn-sm bg-[#437057] text-white'>
            <ClipboardPlus size={20} />
            <p>Create Application</p>
          </Link>
        </div> */}

        <div>
            <p className='text-xl font-semibold'>PWD Masterlist</p>
        </div>

        <Container className='space-y-4'>
          {/* search and filter */}
          <div className='flex justify-between items-center'>
            {/* searchbar */}
            <label className="input input-sm w-70 px-2">
              <Search opacity={0.5} size={20} />
              <input type="search" required placeholder="Search" />
            </label>

            {/* button */}
            <div className='relative'>
              <button className='btn btn-sm border-gray-300 font-normal me-2' >
                Sort
                <ArrowDownUp size={18}/>
              </button>
              
              <button className='btn btn-sm border-gray-300 font-normal' onClick={toggleFilter}>
                Filter
                <ListFilter size={18}/>
              </button>

              {showFilter && <AdvanceFilter closeFilter={toggleFilter} />}
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
              {pwds.length === 0 ? (
                  <TableRow>
                      <TableCell colSpan={8} className='text-center'>
                          <span className="text-gray-400">No PWD found.</span>
                      </TableCell>
                  </TableRow>
              ) : (
                  pwds.map((pwd: any) => (
                      <TableRow key={pwd.id}>
                          <TableCell>{pwd.issued_pwd_id}</TableCell>
                          <TableCell ><span className='text-red-500'>Active</span></TableCell>
                          <TableCell>{pwd.application.applicant.lastname}</TableCell>
                          <TableCell>{pwd.application.applicant.firstname}</TableCell>
                          <TableCell>{pwd.application.applicant.middlename}</TableCell>
                          <TableCell>
                          <div className='space-x-2'>
                              {pwd.application.applicant.applicant_disabilities.map((dis: any, index: any) => (
                              <span className='badge badge-sm border-gray-200 rounded-sm' key={index}>{dis.disability_details.disability_type_name}</span>
                              ))}
                          </div>
                          </TableCell>
                          <TableCell>{pwd.application.date_applied}</TableCell>
                          <TableCell>
                          <div className='flex justify-around items-center'>
                              <Link to={`/pwd/`+pwd.id} className='text-green-600'><Eye /></Link>
                              <Link to='' className='text-blue-400'><SquarePen /></Link>
                              <Link to='' className='text-red-400'><Trash2 /></Link>
                          </div>
                          </TableCell>
                      </TableRow>
                  ))
              )}
            </TableBody>
          </Table>

      {/* Pagination */}
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
      </Container>
    </div>
  );
}

export default PWD;

interface AdvanceFilterProps {
  closeFilter: () => void
}

const AdvanceFilter = ({closeFilter}: AdvanceFilterProps) => {
  return(
    <div className='bg-white border border-gray-300 rounded-sm px-2 pt-2 pb-4 text-sm absolute top-10 right-0 z-10 transition-all w-80'>
      <div className='flex justify-between items-center px-2'>
        <p>Advance Filter</p>

        <button type='button' className='cursor-pointer' onClick={closeFilter} >
          <X />
        </button>
      </div>

      <div className='px-2 mt-4'>
        <div className='flex justify-between items-center'>
          <p className='opacity-50'>Date Range</p>
          <p className='text-blue-400 text-xs'>Clear</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className='flex flex-col'>
            <p className='opacity-50'>From</p>
            <input type="date" className='input input-sm' />
          </div>
           <div className='flex flex-col'>
            <p className='opacity-50'>To</p>
            <input type="date" className='input input-sm' />
          </div>
        </div>

        <div className='mt-4'>
          <div className='flex justify-between items-center'>
            <p className='opacity-50'>Disability Type</p>
            <p className='text-blue-400 text-xs'>Clear</p>
          </div>

          <select name="" id="" className='select select-sm mt-2'>
            <option value="">All</option>
            <option value="">Speech and Language</option>
            <option value="">Visual</option>
            <option value="">Learning</option>
            <option value="">Physical</option>
            <option value="">Psychosocial</option>
            <option value="">Mental</option>
            <option value="">Intellectual</option>
            <option value="">Hearing</option>
            <option value="">Rare Disease</option>
            <option value="">Cancer</option>
          </select>
        </div>

        <div className='mt-4'>
          <div className='flex justify-between items-center'>
            <p className='opacity-50'>Status</p>
            <p className='text-blue-400 text-xs'>Clear</p>
          </div>

          <select name="" id="" className='select select-sm mt-2'>
            <option value="">All</option>
            <option value="">Active</option>
            <option value="">Will Expire</option>
            <option value="">Inactive</option>
          </select>
        </div>

        <button type="button" className='btn btn-sm w-full bg-[#437057] text-white mt-4'>
          Apply
        </button>
      </div>
    </div>
  )
}

// const TableBadge = ({text}: {text: string | number}) => {

//   let badgeColor = 'badge-warning';

//   if(text == 'Pending') {
//     badgeColor = 'badge-warning';
//   } else if(text == 'Rejected') {
//     badgeColor = 'badge-error';
//   } else if(text == 'Approved') {
//     badgeColor = 'badge-success';
//   } else {
//     badgeColor = '';
//   }

//   return(
//     <p className={`badge badge-sm rounded-sm ${badgeColor}`}>{text}</p>
//   )
// }