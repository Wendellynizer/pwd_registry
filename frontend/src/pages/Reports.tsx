import React from 'react'

const Reports = () => {
  return (
    <div className='space-y-4'>
      <p className='text-lg font-semibold'>Registration Form</p>

      <Container>
        <ContainerTitle text='Select Type of Report' />
        
        <form method='GET' className='space-y-4'>
          <div className='flex items-center mt-4'>
            <label htmlFor="" className='text-xs me-2'>Report Type:</label>
            <select name="" id="" className='select select-sm w-fit'>
              <option value="">Please Select</option>
              <option value="">Sex and Disability</option>
              <option value="">Civil Status and Disability</option>
              <option value="">Educational Attainment and Disability</option>
              <option value="">Category of Employment and Disability</option>
              <option value="">Skills and Disability</option>
              <option value="">Employment Status and Disability</option>
              <option value="">Type of Employment and Disability</option>
              <option value="">Age Range and Disability</option>
            </select>
          </div>
          
  
          
          <div className='flex gap-4'>
            <div className='flex items-center gap-2'>
              <label htmlFor="" className='me-2 text-xs'>From:</label>
              <input type="date" className='input input-sm' name="" id="" />
            </div>
            
            <div className='flex items-center gap-2'>
              <label htmlFor="" className='me-2 text-xs'>To:</label>
              <input type="date" className='input input-sm' name="" id=""  />
            </div>
          </div>

          <div className='space-x-2'>
            <button className='btn btn-sm btn-success'>Generate Report</button>
            <button className='btn btn-sm'>Export to Excel</button>
          </div>
        </form>
      </Container>

      <Container>
        <ContainerTitle text='Report per Geographical Location' />
        
        <form method='GET' className='space-y-4'>
          <div className='flex items-center mt-4'>
            <label htmlFor="" className='text-xs me-2'>Report Type:</label>
            <select name="" id="" className='select select-sm w-fit'>
              <option value="">Please Select</option>
              <option value="">Disability Cases per Geographical Location</option>
              <option value="">Person with Disabilities per Geographical Location</option>
            </select>
          </div>
          
  
          
          <div className='flex gap-4'>
            <div className='flex items-center gap-2'>
              <label htmlFor="" className='me-2 text-xs'>From:</label>
              <input type="date" className='input input-sm' name="" id="" />
            </div>
            
            <div className='flex items-center gap-2'>
              <label htmlFor="" className='me-2 text-xs'>To:</label>
              <input type="date" className='input input-sm' name="" id=""  />
            </div>
          </div>

          <div className='space-x-2'>
            <button className='btn btn-sm btn-success'>Generate Report</button>
            <button className='btn btn-sm'>Export to Excel</button>
          </div>
        </form>
      </Container>
    </div>
  )
}

export default Reports;

const Container = ({children, className}: {children: React.ReactNode, className?: string}) => {
  return(
    <div className={`border border-gray-300 rounded-sm p-4 ${className}`}>
      {children}
    </div>
  )
}

const ContainerTitle = ({text, className}: {text: string, className?: string}) => {
  return <p className={`font-medium ${className}`}>{text}</p>;
}