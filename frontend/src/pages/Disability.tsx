import { Eye, ListFilter, PlusIcon, Search, SquarePen, Trash2} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/Table'
import { disabilityCrud } from '../api/modules/disability'

const Disability = () => {

  const header = [
      'No.', 'Disability Type',  'Name', 'Actions'
  ]
  
  const [showFilter, setShowFilter] = useState(false);
    
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  }

  const [disabilities, setDisabilities] = useState([]);

  useEffect(() => {
    const loadData = async() => {
      const data = await disabilityCrud.getAll();
      setDisabilities(data);

      console.log(data);
    }

    loadData();
  }, []);
    
  return (
    <div className='p-5 space-y-4'>
			<div>
        <p className='text-xl font-semibold'>Disabilities</p>
      </div>

			{/* create application button */}
        <div className='flex justify-end'>
          <Link to='/personnel/create'
          className='btn btn-sm bg-[#437057] text-white'>
            <PlusIcon size={20} />
            <p>Add Disability</p>
          </Link>
        </div>

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
						closeFilter={() => {}}
						filters={{}}
						setFilters={() => {}}
						applyFilters={() => {}}
					/>}
				</div>
			</div>

			<Table>
				<TableHead>
					<TableRow>
						{header.map((name, index) => <TableHeader key={index}>{name}</TableHeader>)}
					</TableRow>
				</TableHead>

				<TableBody>
          {disabilities.map((dis: any, index: any) => (
            <TableRow key={index}>
              <TableCell>{dis.id}</TableCell>
              <TableCell>{dis.disability_type.disability_type_name}</TableCell>
              <TableCell>{dis.disability_name}</TableCell>
              <TableCell>
                <div className='flex justify-start gap-4 items-center'>
                  <Link to='' className='text-green-600'><Eye /></Link>
                  <Link to='' className='text-blue-400'><SquarePen /></Link>
                  <Link to='' className='text-red-400'><Trash2 /></Link>
                </div>
						</TableCell>
            </TableRow>
          ))}
				</TableBody>
			</Table>

			{/* pagination */}
			<div className='mt-4 flex justify-between'>
         {/* record count */}
         <p className='text-sm'>Showing <span className='font-semibold'>1 - 2</span>  of <span className='font-semibold'>2</span> Entries</p>

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
  )
}

export default Disability

interface AdvanceFilterProps {
	closeFilter: () => void;
	filters: {
		// date_from: string;
		// date_to: string;
		// disability_type: string;
		// status: string;
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
        <div className='mt-4'>
          <div className='flex justify-between items-center'>
            <p className='opacity-50'>Role</p>
            <button onClick={() => clearFields('disability_type')} className='text-blue-400 text-xs'>Clear</button>
          </div>
          <select name='disability_type' value={filters.disability_type} onChange={handleChange} className='select select-sm mt-2 w-full'>
            <option value="">All</option>
            <option value="8">Admin</option>
            <option value="7">Roving Personnel</option>
          </select>
        </div>

        <div className='mt-4'>
          <div className='flex justify-between items-center'>
            <p className='opacity-50'>Assigned Barangay</p>
            <button onClick={() => clearFields('status')} className='text-blue-400 text-xs'>Clear</button>
          </div>
          <select name='status' value={filters.status} onChange={handleChange} className='select select-sm mt-2 w-full'>
            <option value="">All</option>
          </select>
        </div>

        <button type="button" className='btn btn-sm w-full bg-[#437057] text-white mt-4' onClick={applyFilters}>
          Apply
        </button>
      </div>
    </div>
  );
};