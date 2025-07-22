import React from 'react';
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
import { Accessibility, Circle, FileUser, UserRoundX, UsersRound } from 'lucide-react';

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

const Analytics = () => {
  
  const borderWidth = 2;
  const tension = 0.15;

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

  const lineData = {
    labels: labels,
    datasets: [
      {
        label: 'Rare Disease (RA10747)',
        data: [12, 18, 14, 19, 17, 21],
        borderColor: '#7e57c2',
        backgroundColor: '#7e57c2',
        borderWidth: 2,
        tension: 0.15,
      },
      {
        label: 'Cancer (RA11215)',
        data: [20, 25, 23, 28, 26, 30],
        borderColor: '#ef5350',
        backgroundColor: '#ef5350',
        borderWidth: 2,
        tension: 0.15,
      },
      {
        label: 'Visual Disability',
        data: [40, 44, 42, 47, 45, 50],
        borderColor: '#42a5f5',
        backgroundColor: '#42a5f5',
        borderWidth: 2,
        tension: 0.15,
      },
      {
        label: 'Speech and Language Impairment',
        data: [18, 22, 20, 23, 21, 24],
        borderColor: '#26a69a',
        backgroundColor: '#26a69a',
        borderWidth: 2,
        tension: 0.15,
      },
      {
        label: 'Psychosocial Disability',
        data: [10, 15, 12, 18, 14, 20],
        borderColor: '#ab47bc',
        backgroundColor: '#ab47bc',
        borderWidth: 2,
        tension: 0.15,
      },
      {
        label: 'Physical Disability',
        data: [60, 65, 62, 70, 68, 75],
        borderColor: '#ffa726',
        backgroundColor: '#ffa726',
        borderWidth: 2,
        tension: 0.15,
      },
      {
        label: 'Mental Disability',
        data: [25, 30, 28, 32, 29, 35],
        borderColor: '#5c6bc0',
        backgroundColor: '#5c6bc0',
        borderWidth: 2,
        tension: 0.15,
      },
      {
        label: 'Learning Disability',
        data: [12, 17, 14, 19, 15, 21],
        borderColor: '#66bb6a',
        backgroundColor: '#66bb6a',
        borderWidth: 2,
        tension: 0.15,
      },
      {
        label: 'Intellectual Disability',
        data: [15, 20, 17, 23, 19, 25],
        borderColor: '#ec407a',
        backgroundColor: '#ec407a',
        borderWidth: 2,
        tension: 0.15,
      },
      {
        label: 'Deaf or Hard of Hearing',
        data: [30, 36, 32, 38, 35, 40],
        borderColor: '#29b6f6',
        backgroundColor: '#29b6f6',
        borderWidth: 2,
        tension: 0.15,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    scales: {
      x: {
        grid: {
          drawOnChartArea: false  // This removes the vertical lines
        }
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
        display: false
      },
    },
  }

  const disabilityBarData = {
    labels: ['Hearing', 'Intellectual', 'Learning', 'Mental', 'Physical', 'Psychosocial', 'Speech', 'Visual', 'Cancer', 'Rare Disease'],
    datasets: [
      {
        label: 'Count',
        data: [231, 234, 231, 234, 231, 234, 231, 234, 231, 200],
        backgroundColor: 'rgba(255, 99, 132, 1)',
        borderRadius: 2,
        stack: 'bar',
        barPercentage: 0.7
      },
    ],
  };

  const ageGroupData = {
    labels: ['0-10', '11-17', '18-29', '30-59', '60+'],
    datasets: [
      {
        label: 'Count',
        data: [231, 234, 231, 234, 231, 234, 231, 234, 231, 200],
        backgroundColor: 'rgba(255, 99, 132, 1)',
        borderRadius: 2,
        stack: 'bar',
        barPercentage: 0.7
      },
    ],
  }

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false
      },
    }
  }

  const genderData = {
    labels: ['Female', 'Male'],
    datasets: [
      {
        label: 'No. of PWD',
        data: [40, 50],
        backgroundColor: [
          '#F95454',
          '#0D92F4',
        ],
        borderColor: [
          'rgba(255, 99, 132, 0)',
          'rgba(54, 162, 235, 0)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='space-y-4'>
      <div>
        <p className='text-xl font-semibold'>Analytics</p>
        <p className='text-sm mt-2 text-gray-500'>Track PWD Registry Trends</p>
      </div>

      <ColumnedContainer>
        {/* cards */}
        <ColumnedContainer column={4}>
            <Card 
              icon={<Accessibility />}
              title='Total PWD'
              value={1630}
            />

            <Card 
              icon={<FileUser />}
              title='Applications'
              value={32}
            />

            <Card 
              icon={<UserRoundX />}
              title='Inactive PWD'
              value={10}
            />

            <Card 
              icon={<UsersRound />}
              title='Personnel'
              value={5}
            />
        </ColumnedContainer>

        {/* forecasting and gender */}
        <ColumnedContainer column={3}>
          {/* disability forecasting */}
          <Container className='col-span-2'>
            <div className='mb-8 flex justify-between'>
              <div className="grid">
                <ContainerTitle text='PWD Forecasting' /> 
                <p className='text-gray-500 text-sm'>How much PWD will be in 6 months</p>
              </div>

              <select name="" id="" className='select select-sm w-fit'>
                <option value="">All</option>
                <option value="">Speech</option>
                <option value="">Visual</option>
                <option value="">Learning</option>
                <option value="">Intellectual</option>
                <option value="">Mental</option>
                <option value="">Physical</option>
                <option value="">Psychosocial</option>
                <option value="">Hearing</option>
                <option value="">Cancer</option>
                <option value="">Rare Disease</option>
              </select>
            </div>
            <Line 
              options={lineOptions}
              data={lineData}
              height={100}
            />
          </Container>

          {/* gender pie chart */}
          <Container className='h-full flex flex-col'>
            {/* text */}
            <div className="grid mb-8">
                <ContainerTitle text='PWD By Gender' /> 
                <p className='text-gray-500 text-sm'>Count of PWD by gender</p>
              </div>
          
            {/* pie chart */}
            <div className='flex-grow'>
              <div className='h-full w-full'>
                <Pie options={pieOptions} data={genderData}  />
              </div>
            </div>

            {/* data */}
            <div className='space-y-2 mt-2'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <Circle fill='#0D92F4' stroke='none' />
                  <p className='text-gray-400'>Male</p>
                </div>
  
                <p className='font-semibold'>50</p>
              </div>
  
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <Circle fill='#F95454' stroke='none' />
                  <p className='text-gray-400'>Female</p>
                </div>
  
                <p className='font-semibold'>40</p>
              </div>
            </div>
          </Container>
        </ColumnedContainer>

        {/* disability pwd count */}
        <ColumnedContainer column={2}>
          {/* disability count */}
          <Container>
            <div className='mb-8'>
              <ContainerTitle text='PWD by Disability Type' />
              <p className='text-gray-500 text-sm'>PWD count by disability type</p> 
            </div>

            <Bar
                options={barOptions}
                data={disabilityBarData}
            />
          </Container>

          {/* age group */}
          <Container>
             <div className='mb-8'>
              <ContainerTitle text='PWD by Age Group' />
              <p className='text-gray-500 text-sm'>PWD count by age group</p> 
            </div>

            <Bar 
              options={barOptions}
              data={ageGroupData}
            />
          </Container>
        </ColumnedContainer>
      </ColumnedContainer>
    </div>
  )
}

export default Analytics;


//* components exclusive to analytics
const Container = ({children, className}: {children: React.ReactNode, className?: string}) => {
  return(
    <div className={`border border-gray-300 rounded-sm p-4 ${className}`}>
      {children}
    </div>
  )
}

const ColumnedContainer = ({
  children,
  column = 1,
  className
}: {
  children?: React.ReactNode;
  column?: number;
  className?: string;
}) => {

  const columns = `grid-cols-${column.toString()}`

  // return <div className="flex gap-4">{children}</div>;
  return <div className={`grid ${columns} gap-4 ${className}`}>{children}</div>;
};

const ContainerTitle = ({text, className}: {text: string, className?: string}) => {
  return <p className={`font-medium ${className}`}>{text}</p>;
}

const Card = ({
  icon,
  title,
  value
}: {
  icon: any,
  title: string,
  value: string | number
}) => {
  return(
    <div className='border border-gray-300 rounded-sm px-4 py-4'>
      <div className='flex gap-2 items-center'>
        {icon}
        <p className='text-sm'>{title}</p>
      </div>

      <p className='font-medium text-2xl mt-4'>{value}</p>
    </div>
  );
}