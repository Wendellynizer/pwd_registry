import { Accessibility, FileUser, UserRoundX } from "lucide-react";
import Card from "../components/Dashboard/Card";
import RegistrationChart from "../components/Analytics/RegistrationChart";
import DisabilityChart from "../components/Analytics/DisabilityChart";
import GenderChart from "../components/Analytics/GenderChart";
import Container from "../components/Container";
import ColumnedContainer from "../components/general/ColumnedContainer";

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
import ContainerTitle from "../components/Dashboard/ContainerTitle";
import { useState } from "react";

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

function Dashboard() {

  const [selectedType, setSelectedType] = useState('Speech');
  const [selectedRange, setSelectedRange] = useState('Monthly');

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        // suggestedMax: getMaxYValue(chartDataWithForecast.datasets),
        ticks: {
          stepSize: 2,
        },
      }
    }
  };

  const disabilityLineData: any = {
    Speech: {
      Monthly: [7, 13, 20, 22, 18, 15, 19, 21, 23, 20, 18, 19],
      Yearly: [120, 138, 152, 161, 170],
    },
    Visual: {
      Monthly: [5, 6, 9, 11, 7, 10, 12, 13, 15, 16, 14, 12],
      Yearly: [80, 92, 104, 115, 120],
    },
    Learning: {
      Monthly: [3, 5, 6, 7, 9, 8, 7, 6, 5, 8, 9, 10],
      Yearly: [55, 63, 68, 70, 75],
    },
    Physical: {
      Monthly: [15, 18, 20, 22, 25, 24, 27, 29, 30, 32, 31, 30],
      Yearly: [180, 192, 208, 220, 235],
    },
    Psychosocial: {
      Monthly: [6, 7, 6, 9, 10, 8, 9, 11, 10, 9, 10, 8],
      Yearly: [70, 75, 80, 82, 85],
    },
    Mental: {
      Monthly: [2, 4, 5, 6, 4, 5, 7, 6, 5, 5, 6, 4],
      Yearly: [40, 45, 48, 52, 55],
    },
    Intellectual: {
      Monthly: [8, 9, 10, 12, 11, 13, 14, 15, 14, 13, 15, 16],
      Yearly: [100, 108, 112, 120, 125],
    },
    Hearing: {
      Monthly: [6, 8, 10, 9, 11, 13, 12, 14, 13, 12, 11, 13],
      Yearly: [85, 92, 95, 102, 108],
    },
    Cancer: {
      Monthly: [1, 1, 2, 2, 3, 2, 3, 3, 2, 3, 3, 2],
      Yearly: [15, 18, 20, 22, 24],
    },
    'Rare Disease (RA10747)': {
      Monthly: [0, 1, 1, 2, 1, 1, 2, 2, 1, 1, 2, 1],
      Yearly: [6, 8, 10, 11, 12],
    }
  };


  const yearLabels = ['2020', '2021', '2022', '2023', '2024'];
  const monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

  const pwdData = {
    labels: selectedRange === 'Monthly' ? monthLabels : yearLabels,
    datasets: [
      {
        label: selectedType,
        data: disabilityLineData[selectedType][selectedRange],
        borderColor: '#FFA500',
        borderWidth: 1,
        tension: 0.3
      }
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

  const barDisabilityData = {
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

  return (
    <div className="p-5 space-y-4">
      {/* welcome */} 
      <p className='text-xl font-semibold'>Dashboard</p>

      {/* card container */}
      <ColumnedContainer column={3}>
        <Card 
          title="Total PWD"
          value={3903}
          icon={<Accessibility size={60}/>}
        />

        <Card 
          title="Pending Application"
          value={14}
          icon={<FileUser size={60}/>}
        />

        <Card 
          title="Inactive PWD"
          value={604}
          icon={<UserRoundX size={60} />}
        />
      </ColumnedContainer>

      <ColumnedContainer column={2}>
        {/* line chart */}
        <Container>
          <div className="flex justify-between items-center mb-8">
            <ContainerTitle text="No. of PWD" />

            <div className="space-x-2">
              <select name="" id="" className="select select-xs w-fit" 
              onChange={(e) => setSelectedRange(e.target.value)}>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>

              <select name="" id="" className="select select-xs w-fit"
              onChange={(e) => setSelectedType(e.target.value)}>
                {/* <option value="">Speech and Language</option>
                <option value="">Visual</option>
                <option value="">Learning</option>
                <option value="">Physical</option>
                <option value="">Psychosocial</option>
                <option value="">Mental</option>
                <option value="">Intellectual</option>
                <option value="">Hearing</option>
                <option value="">Cancer</option>
                <option value="">Rare Disease (RA10747)</option> */}
                {Object.keys(disabilityLineData).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Line 
            options={lineOptions}
            data={pwdData}
            height={150}
          />
        </Container>

        {/* bar chart */}
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
            data={barDisabilityData}
            height={150}
          />
        </Container>
      </ColumnedContainer>
    </div>
  );
}

{/* charts */}
<div className="mt-5">
        {/* line chart */}
        <Container>
          <RegistrationChart />
        </Container>

        <div className="flex gap-4 mt-5">
          <div className="flex-1">
            <DisabilityChart />
          </div>

          <div className="flex-1">
            <GenderChart />
          </div>
        </div>
      </div>

export default Dashboard;