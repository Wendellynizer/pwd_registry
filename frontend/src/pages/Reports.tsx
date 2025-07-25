
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
import { Link } from 'react-router';

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
  const [reportID, setReportID] = useState('');
  const [generateSex, setGenerateSex] = useState(false);
  const [generateStatus, setGenerateStatus] = useState(false);
  const [generateEducation, setGenerateEducation] = useState(false);

  const [disabilityPerLocation, setDisabilityPerLocation] = useState(false);
  const [pwdPerLocation, setPwdPerLocation] = useState(false);

  const generateReport = (value: any) => {
    setGenerateSex(value == 1);
    setGenerateStatus(value == 2);
    setGenerateEducation(value == 3);
  }

  const generateReportGeographic = (value: any) => {
    setDisabilityPerLocation(value == 1);
    setPwdPerLocation(value == 2);
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
            {/* <Link to={'/reports/'+reportID} className='btn btn-sm btn-success'>Generate Report</Link> */}
            <button className='btn btn-sm'>Export to Excel</button>
          </div>
        </div>
      </Container>

      <Container>
        <ContainerTitle text='Report per Geographical Location' />
        
        <form method='GET' className='space-y-4'>
          <div className='flex items-center mt-4'>
            <label htmlFor="" className='text-xs me-2'>Report Type:</label>
            <select name="" id="" className='select select-sm w-fit' onChange={(e) => setReportID(e.target.value)}>
              <option value="">Please Select</option>
              <option value="1">Disability Cases per Geographical Location</option>
              <option value="2">Person with Disabilities per Geographical Location</option>
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
            <button className='btn btn-sm btn-success' type='button' onClick={(e) => generateReportGeographic(reportID)}>Generate Report</button>
            <button className='btn btn-sm'>Export to Excel</button>
          </div>
        </form>
      </Container>

      <Container>

        {/* generate data view */}
        {/* {generateSex && 
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
        } */}

        {generateSex && <Reports1 />}
        {generateStatus && <Reports2 />}

        {disabilityPerLocation && <Reports3 />}
        {pwdPerLocation && <Reports4 />}
        
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



export const Reports1 = () => {
  return (
    <>
      <div className='mb-8 space-y-4'>
        <div>
          <p className='text-center font-bold text-xl'>iPWD Registry Report</p>

          <div className='text-xs text-gray-500 text-right'>Date Generated: July 22, 2025</div>
          <div className='text-xs text-gray-500 text-right'>Time Generated: 11:32 am</div>
        </div>
        

        <div>
          <div className='border-t'></div>
          <div className='flex justify-between items-center px-4'>
            <p className='text-sm'>2024 - 2025</p>
            <p className='text-center'>PWD by Sex and Disability</p>
            <p className='text-sm'>Page 1</p>
          </div>
          <div className='border-t'></div>
        </div>

        <p className='text-sm text-center'>From <span className='font-semibold'>03/11/2024</span> through <span className='font-semibold'>07/20/2025</span></p>
      </div>

      
      <table className='border w-full mb-90'>
        <thead>
          <tr className='text-sm'>
            <TD>{''}</TD>
            <TD className='font-semibold'>Speech</TD>
            <TD className='font-semibold'>Visual</TD>
            <TD className='font-semibold'>Learning</TD>
            <TD className='font-semibold'>Mental</TD>
            <TD className='font-semibold'>Intellectual</TD>
            <TD className='font-semibold'>Physical</TD>
            <TD className='font-semibold'>Psychosocial</TD>
            <TD className='font-semibold'>Hearing</TD>
            <TD className='font-semibold'>Psychosocial</TD>
            <TD className='font-semibold'>Hearing</TD>
            <TD className='font-semibold'>Cancer</TD>
            <TD className='font-semibold'>Rare Disease</TD>
            <TD className='font-semibold'>Total</TD>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TD className='font-semibold'>Male</TD>
            <TD>40</TD>
            <TD>51</TD>
            <TD>123</TD>
            <TD>90</TD>
            <TD>50</TD>
            <TD>32</TD>
            <TD>46</TD>
            <TD>64</TD>
            <TD>97</TD>
            <TD>122</TD>
            <TD>30</TD>
            <TD>21</TD>
            <TD className='font-bold'>765</TD>
          </tr>
          <tr>
            <TD className='font-semibold'>Female</TD>
            <TD>150</TD>
            <TD>67</TD>
            <TD>34</TD>
            <TD>80</TD>
            <TD>81</TD>
            <TD>48</TD>
            <TD>71</TD>
            <TD>190</TD>
            <TD>59</TD>
            <TD>41</TD>
            <TD>32</TD>
            <TD>17</TD>
            <TD className='font-bold'>870</TD>
          </tr>

          <tr>
            <TD className='font-semibold text-left' colSpan={13}>Total</TD>
            <TD className='font-bold text-left' >1635</TD>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export const Reports2 = () => {
  return (
    <>
      <div className='mb-8 space-y-4'>
        <div>
          <p className='text-center font-bold text-xl'>iPWD Registry Report</p>

          <div className='text-xs text-gray-500 text-right'>Date Generated: July 22, 2025</div>
          <div className='text-xs text-gray-500 text-right'>Time Generated: 11:32 am</div>
        </div>
        

        <div>
          <div className='border-t'></div>
          <div className='flex justify-between items-center px-4'>
            <p className='text-sm'>2024 - 2025</p>
            <p className='text-center'>PWD by Civil Status and Disability</p>
            <p className='text-sm'>Page 1</p>
          </div>
          <div className='border-t'></div>
        </div>

        <p className='text-sm text-center'>From <span className='font-semibold'>03/11/2024</span> through <span className='font-semibold'>07/20/2025</span></p>
      </div>

      
      <table className='border w-full mb-90'>
        <thead>
          <tr className='text-sm'>
            <TD>{''}</TD>
            <TD className='font-semibold'>Speech</TD>
            <TD className='font-semibold'>Visual</TD>
            <TD className='font-semibold'>Learning</TD>
            <TD className='font-semibold'>Mental</TD>
            <TD className='font-semibold'>Intellectual</TD>
            <TD className='font-semibold'>Physical</TD>
            <TD className='font-semibold'>Psychosocial</TD>
            <TD className='font-semibold'>Hearing</TD>
            <TD className='font-semibold'>Psychosocial</TD>
            <TD className='font-semibold'>Hearing</TD>
            <TD className='font-semibold'>Cancer</TD>
            <TD className='font-semibold'>Rare Disease</TD>
            <TD className='font-semibold'>Total</TD>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TD className='font-semibold'>Single</TD>
            <TD>34</TD>
            <TD>61</TD>
            <TD>25</TD>
            <TD>73</TD>
            <TD>12</TD>
            <TD>45</TD>
            <TD>39</TD>
            <TD>60</TD>
            <TD>91</TD>
            <TD>85</TD>
            <TD>47</TD>
            <TD>19</TD>
            <TD className='font-bold'>691</TD>
          </tr>
          <tr>
            <TD className='font-semibold'>Separated</TD>
            <TD>50</TD>
            <TD>44</TD>
            <TD>90</TD>
            <TD>23</TD>
            <TD>77</TD>
            <TD>58</TD>
            <TD>31</TD>
            <TD>88</TD>
            <TD>39</TD>
            <TD>71</TD>
            <TD>63</TD>
            <TD>20</TD>
            <TD className='font-bold'>654</TD>
          </tr>
          <tr>
            <TD className='font-semibold'>Cohabitation</TD>
            <TD>55</TD>
            <TD>35</TD>
            <TD>22</TD>
            <TD>67</TD>
            <TD>19</TD>
            <TD>49</TD>
            <TD>24</TD>
            <TD>86</TD>
            <TD>41</TD>
            <TD>59</TD>
            <TD>38</TD>
            <TD>29</TD>
            <TD className='font-bold'>524</TD>
          </tr>
          <tr>
            <TD className='font-semibold'>Married</TD>
            <TD>66</TD>
            <TD>52</TD>
            <TD>35</TD>
            <TD>78</TD>
            <TD>61</TD>
            <TD>33</TD>
            <TD>55</TD>
            <TD>42</TD>
            <TD>70</TD>
            <TD>67</TD>
            <TD>23</TD>
            <TD>11</TD>
            <TD className='font-bold'>593</TD>
          </tr>
          <tr>
            <TD className='font-semibold'>Widow/er</TD>
            <TD>44</TD>
            <TD>23</TD>
            <TD>18</TD>
            <TD>49</TD>
            <TD>35</TD>
            <TD>40</TD>
            <TD>27</TD>
            <TD>31</TD>
            <TD>46</TD>
            <TD>28</TD>
            <TD>33</TD>
            <TD>16</TD>
            <TD className='font-bold'>390</TD>
          </tr>
          <tr>
            <TD className='font-semibold text-left' colSpan={13}>Total</TD>
            <TD className='font-bold text-left'>2852</TD>
          </tr>
        </tbody>

      </table>
    </>
  )
}

export const Reports3 = () => {
  return (
    <>
      <div className='mb-8 space-y-4'>
        <div>
          <p className='text-center font-bold text-xl'>iPWD Registry Report</p>

          <div className='text-xs text-gray-500 text-right'>Date Generated: July 22, 2025</div>
          <div className='text-xs text-gray-500 text-right'>Time Generated: 11:32 am</div>
        </div>
        

        <div>
          <div className='border-t'></div>
          <div className='flex justify-between items-center px-4'>
            <p className='text-sm'>2024 - 2025</p>
            <p className='text-center'>Disability Cases per Geographical Location</p>
            <p className='text-sm'>Page 1</p>
          </div>
          <div className='border-t'></div>
        </div>

        <p className='text-sm text-center'>From <span className='font-semibold'>03/11/2024</span> through <span className='font-semibold'>07/20/2025</span></p>
      </div>

      
      <table className='border w-full mb-90'>
        <thead>
          <tr className='text-sm'>
            <TD>{''}</TD>
            <TD className='font-semibold'>Speech</TD>
            <TD className='font-semibold'>Visual</TD>
            <TD className='font-semibold'>Learning</TD>
            <TD className='font-semibold'>Mental</TD>
            <TD className='font-semibold'>Intellectual</TD>
            <TD className='font-semibold'>Physical</TD>
            <TD className='font-semibold'>Psychosocial</TD>
            <TD className='font-semibold'>Hearing</TD>
            <TD className='font-semibold'>Cancer</TD>
            <TD className='font-semibold'>Rare Disease</TD>
            <TD className='font-semibold'>Total</TD>
          </tr>
        </thead>
        <tbody>
          {[
            "Apokon", "Bincungan", "Busaon", "Canocotan", "Cuambogan", "La Filipina", "Liboganon", "Madaum", "Magdum", 
            "Magugpo East", "Magugpo North", "Magugpo South", "Magugpo West", "Mankilam", "New Balamban", 
            "Nueva Fuerza", "Pagsabangan", "Pandapan", "San Agustin", "San Isidro", "Visayan Village", 
            "Villa Consolacion", "Barangay 34-B"
          ].map((barangay) => {
            // Generate random values for each disability type
            const speech = Math.floor(Math.random() * 15);
            const visual = Math.floor(Math.random() * 20);
            const learning = Math.floor(Math.random() * 10);
            const mental = Math.floor(Math.random() * 18);
            const intellectual = Math.floor(Math.random() * 12);
            const physical = Math.floor(Math.random() * 25);
            const psychosocial = Math.floor(Math.random() * 10);
            const hearing = Math.floor(Math.random() * 15);
            const cancer = Math.floor(Math.random() * 5);
            const rare = Math.floor(Math.random() * 3);
            const total = speech + visual + learning + mental + intellectual + physical + psychosocial + hearing + cancer + rare;

            return (
              <tr key={barangay}>
                <TD className='font-semibold'>{barangay}</TD>
                <TD>{speech}</TD>
                <TD>{visual}</TD>
                <TD>{learning}</TD>
                <TD>{mental}</TD>
                <TD>{intellectual}</TD>
                <TD>{physical}</TD>
                <TD>{psychosocial}</TD>
                <TD>{hearing}</TD>
                <TD>{cancer}</TD>
                <TD>{rare}</TD>
                <TD className='font-bold'>{total}</TD>
              </tr>
            );
          })}
        </tbody>
      </table>


    </>
  )
}

export const Reports4 = () => {
  return (
    <>
      <div className='mb-8 space-y-4'>
        <div>
          <p className='text-center font-bold text-xl'>iPWD Registry Report</p>

          <div className='text-xs text-gray-500 text-right'>Date Generated: July 22, 2025</div>
          <div className='text-xs text-gray-500 text-right'>Time Generated: 11:32 am</div>
        </div>
        

        <div>
          <div className='border-t'></div>
          <div className='flex justify-between items-center px-4'>
            <p className='text-sm'>2024 - 2025</p>
            <p className='text-center'>Disability Cases per Geographical Location</p>
            <p className='text-sm'>Page 1</p>
          </div>
          <div className='border-t'></div>
        </div>

        <p className='text-sm text-center'>From <span className='font-semibold'>03/11/2024</span> through <span className='font-semibold'>07/20/2025</span></p>
      </div>

      
      <table className='border w-full mb-90'>
        <thead>
          <tr className='text-sm'>
            <TD>{''}</TD>
            <TD className='font-semibold'>Abangan</TD>
            <TD className='font-semibold'>Apokon</TD>
            <TD className='font-semibold'>Bincungan</TD>
            <TD className='font-semibold'>Busaon</TD>
            <TD className='font-semibold'>Canocotan</TD>
            <TD className='font-semibold'>Cuambogan</TD>
            <TD className='font-semibold'>La Filipina</TD>
            <TD className='font-semibold'>Liboganon</TD>
            <TD className='font-semibold'>Madaum</TD>
            <TD className='font-semibold'>Magdum</TD>
            <TD className='font-semibold'>Magugpo North</TD>
            <TD className='font-semibold'>Magugpo South</TD>
            <TD className='font-semibold'>Magugpo East</TD>
            <TD className='font-semibold'>Magugpo West</TD>
            <TD className='font-semibold'>Mankilam</TD>
            <TD className='font-semibold'>Nueva Fuerza</TD>
            <TD className='font-semibold'>Pandapan</TD>
            <TD className='font-semibold'>Pagsabangan</TD>
            <TD className='font-semibold'>San Agustin</TD>
            <TD className='font-semibold'>San Miguel</TD>
            <TD className='font-semibold'>Visayan Village</TD>
            <TD className='font-semibold'>Total</TD>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TD className='font-semibold'>PWD Count</TD>
            <TD>72</TD>
            <TD>134</TD>
            <TD>65</TD>
            <TD>49</TD>
            <TD>87</TD>
            <TD>58</TD>
            <TD>94</TD>
            <TD>40</TD>
            <TD>52</TD>
            <TD>63</TD>
            <TD>120</TD>
            <TD>109</TD>
            <TD>96</TD>
            <TD>111</TD>
            <TD>85</TD>
            <TD>38</TD>
            <TD>44</TD>
            <TD>92</TD>
            <TD>69</TD>
            <TD>73</TD>
            <TD>101</TD>
            <TD className='font-bold'>1682</TD>
          </tr>
        </tbody>
      </table>

    </>
  )
}


export const TD = ({children, className='', ...rest}) => {
  return (
    <td className={`p-2 text-xs border ${className}`} {...rest}>{children}</td>
  )
}

