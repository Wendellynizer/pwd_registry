import React, { useState } from 'react'
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);


const Reports = () => {

  // const [generate, setGenerate] = useState(false);
  const [reportID, setReportID] = useState();
  const [generateSex, setGenerateSex] = useState(false);
  const [generateStatus, setGenerateStatus] = useState(false);
  const [generateEducation, setGenerateEducation] = useState(false);

  const generateReport = (value: any) => {
    setGenerateSex(value == 1);
    setGenerateStatus(value == 2);
    setGenerateEducation(value == 3);
  }

  const barSexData = {
    labels: ['Speech', 'Visual', 'Learning', 'Physical', 'Psychosocial', 'Mental', 'Intellectual', 'Hearing', 'Cancer', 'Rare Disease'],
    datasets: [
      {
        label: 'Male',
        data: [10, 5, 19, 30, 10, 5, 24, 9, 3, 2],
        backgroundColor: '#63C8FF'
      },
      {
        label: 'Female',
        data: [7, 10, 8, 31, 4, 1, 30, 21, 5, 5],
        backgroundColor: '#FD8A8A'
      }
    ]
  } 

  const barCivilStatusData = {
    labels: ['Single', 'Separated', 'Cohabitation', 'Married', 'Widow/er'],
    datasets: [
      {
        label: 'Civil Status',
        data: [190, 120, 140, 70, 20],
        backgroundColor: '#63C8FF'
      },
    ]
  } 

  const barEducationData = {
    labels: ['None', 'Kindergarten', 'Elementary', 'Junior High School', 'Senior High School', 'College', 'Vocational', 'Post Graduate'],
    datasets: [
      {
        label: 'Civil Status',
        data: [190, 120, 140, 70, 20, 90, 150, 200],
        backgroundColor: '#63C8FF'
      },
    ]
  } 

  const barOptions = {
    responsive: true,
    scales: {
      x: {
        grid: {
          drawOnChartArea: false,  // This removes the vertical lines
        }
      },
      y: {beginAtZero: true, suggestedMax: 32}
    },
    plugins: {
      legend: {
        position: 'top' as const,
        display: false
      },
    },
  }

  return (
    <div className='p-5 space-y-4'>
      <p className='text-lg font-semibold'>Reports</p>

      <Container>
        <ContainerTitle text='Reports per Disability' />
        
        <div className='space-y-4'>
          <div className='flex items-center mt-4'>
            <label htmlFor="" className='text-xs me-2'>Report Type:</label>
            <select name="" id="" className='select select-sm w-fit' onChange={(e) => setReportID(e.target.value)}>
              <option value="">Please Select</option>
              <option value="1">Sex and Disability</option>
              <option value="2">Civil Status and Disability</option>
              <option value="3">Educational Attainment and Disability</option>
              <option value="4">Category of Employment and Disability</option>
              <option value="5">Skills and Disability</option>
              <option value="6">Employment Status and Disability</option>
              <option value="7">Type of Employment and Disability</option>
              <option value="8">Age Range and Disability</option>
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
            <button className='btn btn-sm btn-success' onClick={(e) => generateReport(reportID)}>Generate Report</button>
            <button className='btn btn-sm'>Export to Excel</button>
          </div>
        </div>
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

      <Container>

        {/* generate data view */}
        {generateSex && 
          <Container>
              <div className="flex justify-between items-center mb-8">
                <ContainerTitle text="Total PWD by Disability Type" />

                <div className="space-x-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#63C8FF]"></div>
                    <p className="text-xs text-gray-500">Male</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#FD8A8A] "></div>
                    <p className="text-xs text-gray-500">Female</p>
                  </div>
                </div>
              </div>

              <Bar 
                options={barOptions}
                data={barSexData}
                height={150}
              />
          </Container>
        }

        {generateStatus &&
          <Container>
              <div className="flex justify-between items-center mb-8">
                <ContainerTitle text="Total PWD by Civil Status" />

                <div className="space-x-2">
                </div>
              </div>

              <Bar 
                options={barOptions}
                data={barCivilStatusData}
                height={150}
              />
          </Container>
        }

        {generateEducation &&
          <Container>
              <div className="flex justify-between items-center mb-8">
                <ContainerTitle text="Total PWD by Educational Attainment" />

                <div className="space-x-2">
                </div>
              </div>

              <Bar 
                options={barOptions}
                data={barEducationData}
                height={150}
              />
          </Container>
        }

        
        
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