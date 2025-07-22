import React, { useEffect, useState } from 'react';
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
import { fetchBarangays } from '../api/modules/barangay';

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

  const [barangays, setBarangays] = useState();
  const [bgyLabels, setBgyLabels] = useState<string[]>([]);
  const [selectedDisability, setSelectedDisability] = useState('All');

  
  
  const borderWidth = 2;
  const tension = 0.15;

  const getMaxYValue = (datasets: { data: number[] }[]): number => {
    const allValues = datasets.flatMap(ds => ds.data.filter(v => v !== null));
    const max = Math.max(...allValues);
    return Math.ceil(max * 1.15); // add 15% gap
  };

  

  const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

  const lineData = {
    labels: labels,
    datasets: [
      {
        label: 'Rare Disease (RA10747)',
        data: [12, 16, 10, 15, 11, 14],
        borderColor: '#7e57c2',
        backgroundColor: '#7e57c2',
        borderWidth: 2,
        tension: 0.15,
      },
      {
        label: 'Cancer (RA11215)',
        data: [20, 25, 21, 28, 24, 30],
        borderColor: '#ef5350',
        backgroundColor: '#ef5350',
        borderWidth: 2,
        tension: 0.15,
      },
      {
        label: 'Visual Disability',
        data: [40, 38, 45, 43, 47, 44],
        borderColor: '#42a5f5',
        backgroundColor: '#42a5f5',
        borderWidth: 2,
        tension: 0.15,
      },
      {
        label: 'Speech and Language Impairment',
        data: [18, 20, 19, 21, 18, 23],
        borderColor: '#26a69a',
        backgroundColor: '#26a69a',
        borderWidth: 2,
        tension: 0.15,
      },
      {
        label: 'Psychosocial Disability',
        data: [10, 14, 11, 13, 15, 12],
        borderColor: '#ab47bc',
        backgroundColor: '#ab47bc',
        borderWidth: 2,
        tension: 0.15,
      },
      {
        label: 'Physical Disability',
        data: [60, 65, 62, 70, 68, 66],
        borderColor: '#ffa726',
        backgroundColor: '#ffa726',
        borderWidth: 2,
        tension: 0.15,
      },
      {
        label: 'Mental Disability',
        data: [25, 30, 27, 29, 31, 28],
        borderColor: '#5c6bc0',
        backgroundColor: '#5c6bc0',
        borderWidth: 2,
        tension: 0.15,
      },
      {
        label: 'Learning Disability',
        data: [12, 15, 14, 13, 17, 16],
        borderColor: '#66bb6a',
        backgroundColor: '#66bb6a',
        borderWidth: 2,
        tension: 0.15,
      },
      {
        label: 'Intellectual Disability',
        data: [15, 17, 20, 18, 19, 21],
        borderColor: '#ec407a',
        backgroundColor: '#ec407a',
        borderWidth: 2,
        tension: 0.15,
      },
      {
        label: 'Deaf or Hard of Hearing',
        data: [30, 33, 35, 32, 38, 34],
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

  const pwdBarangayData = {
    labels: bgyLabels,
    datasets: [
      {
        label: 'Count',
        data: [180, 210, 195, 205, 150, 170, 140, 100, 165, 90, 130, 125, 160, 115, 145, 135, 155, 120, 175, 185, 110, 95, 105],
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


  // forecasting
  const extendMonths = (baseMonths: string[], count = 6) => {
    const allMonths = [...baseMonths];
    const lastIndex = baseMonths.length - 1;
    const monthMap = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ];

    let lastMonthIndex = monthMap.indexOf(baseMonths[lastIndex]);
      for (let i = 1; i <= count; i++) {
        lastMonthIndex = (lastMonthIndex + 1) % 12;
        allMonths.push(monthMap[lastMonthIndex]);
      }

      return allMonths;
  };

  const forecastColor = '#FF7A30';

  const extendedLabels = extendMonths(labels, 6); // 6 

  const filteredMainDatasets = selectedDisability === 'All'
  ? lineData.datasets
  : lineData.datasets.filter(dataset =>
      dataset.label.toLowerCase().includes(selectedDisability.toLowerCase())
    );

  const forecastDatasets = filteredMainDatasets.map(dataset => {
    const lastValue = dataset.data[dataset.data.length - 1];

    const forecastData = Array(6).fill(null).map(() => {
      return lastValue + Math.round(Math.random() * 4 - 2); // Simple fluctuation
    });

    // Combine last actual value + forecast values (total 7)
    const connectedForecastData = [
      ...Array(dataset.data.length - 1).fill(null), // padding
      lastValue, // connects line from last actual point
      ...forecastData, // forecast values
    ];

    return {
      label: `${dataset.label} Forecast`,
      data: connectedForecastData,
      borderColor: forecastColor,
      backgroundColor: forecastColor,
      borderDash: [8, 5],
      borderWidth: borderWidth,
      pointRadius: 3,
      pointStyle: 'circle',
      pointBackgroundColor: '#fff', // hollow center
      pointBorderColor: forecastColor,
      tension: tension,
    };
  });

  // const chartDataWithForecast = {
  //   labels: extendedLabels,
  //   datasets: [
  //     ...filteredMainDatasets.map(ds => ({
  //       ...ds,
  //       data: [...ds.data, ...Array(6).fill(null)] // extend with nulls
  //     })),
  //     ...forecastDatasets
  //   ],
  // };

  

  // for overall selection
  
  const sumArrayValues = (arrays: number[][]): number[] => {
    return arrays[0].map((_, idx) => arrays.reduce((sum, arr) => sum + arr[idx], 0));
  };

  const generateForecastData = (baseData: number[]): number[] => {
    const lastValue = baseData[baseData.length - 1];
    return Array(6).fill(null).map(() => lastValue + Math.round(Math.random() * 4 - 2));
  };

  let chartDataWithForecast;

  if (selectedDisability === 'Overall') {
    // 🟡 Get all main data arrays
    const allActualValues = lineData.datasets.map(ds => ds.data);

    // 🟢 Sum per month
    const summedActual = sumArrayValues(allActualValues);

    // 🔵 Forecast for 6 months
    const forecastValues = generateForecastData(summedActual);

    // 🔴 Connect forecast line to last value of actual
    const connectedForecastData = [
      ...summedActual.slice(0, -1).map(() => null),
      summedActual[summedActual.length - 1],
      ...forecastValues
    ];

    // 🟣 Set chart data
    chartDataWithForecast = {
      labels: extendedLabels,
      datasets: [
        {
          label: 'Overall',
          data: [...summedActual, ...Array(6).fill(null)],
          borderColor: '#000',
          backgroundColor: '#000',
          borderWidth,
          pointRadius: 3,
          pointStyle: 'circle',
          pointBackgroundColor: '#fff',
          pointBorderColor: '#000',
          tension
        },
        {
          label: 'Overall Forecast',
          data: connectedForecastData,
          borderColor: forecastColor,
          backgroundColor: forecastColor,
          borderDash: [8, 5],
          borderWidth,
          pointRadius: 3,
          pointStyle: 'circle',
          pointBackgroundColor: '#fff',
          pointBorderColor: forecastColor,
          tension
        }
      ]
    };
  } else {
    // 🌐 Filter based on selected disability or all
    const filteredMainDatasets =
      selectedDisability === 'All'
        ? lineData.datasets
        : lineData.datasets.filter(dataset =>
            dataset.label.toLowerCase().includes(selectedDisability.toLowerCase())
          );

    // 🧠 Generate forecast for each dataset
    const forecastDatasets = filteredMainDatasets.map(dataset => {
      const lastValue = dataset.data[dataset.data.length - 1];
      const forecastData = Array(6).fill(null).map(() => lastValue + Math.round(Math.random() * 4 - 2));
      const connectedForecastData = [
        ...Array(dataset.data.length - 1).fill(null),
        lastValue,
        ...forecastData,
      ];

      return {
        label: `${dataset.label} Forecast`,
        data: connectedForecastData,
        borderColor: forecastColor,
        backgroundColor: forecastColor,
        borderDash: [8, 5],
        borderWidth,
        pointRadius: 3,
        pointStyle: 'circle',
        pointBackgroundColor: '#fff',
        pointBorderColor: forecastColor,
        tension
      };
    });

    // 🧩 Merge into chart
    chartDataWithForecast = {
      labels: extendedLabels,
      datasets: [
        ...filteredMainDatasets.map(ds => ({
          ...ds,
          data: [...ds.data, ...Array(6).fill(null)],
          pointRadius: 3,
          pointStyle: 'circle',
          pointBackgroundColor: '#fff',
          pointBorderColor: ds.borderColor,
        })),
        ...forecastDatasets
      ],
    };
  }
  
  
  // filtering dsibaility on line chart
  const filteredDatasets = selectedDisability === 'All' 
    ? lineData.datasets
    : lineData.datasets.filter(dataset =>
        dataset.label.toLowerCase().includes(selectedDisability.toLowerCase())
      );

  const filteredLineData = {
    ...lineData,
    datasets: filteredDatasets,
  };

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
        suggestedMax: getMaxYValue(chartDataWithForecast.datasets),
        ticks: {
          stepSize: 10,
        },
      }
    }
  };

  useEffect(() => {
    const loadData = async() => {
      const response = await fetchBarangays();
      setBarangays(response.data);
      
      const bgyNames = response.data.map((brgy: any) => brgy.barangay_name);
      setBgyLabels(bgyNames);
    }

    loadData();
  }, []);

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

              <select className='select select-sm w-fit' id="" value={selectedDisability} 
                onChange={(e) => setSelectedDisability(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Overall">Overall</option>
                <option value="Speech">Speech</option>
                <option value="Visual">Visual</option>
                <option value="Learning">Learning</option>
                <option value="Intellectual">Intellectual</option>
                <option value="Mental">Mental</option>
                <option value="Physical">Physical</option>
                <option value="Psychosocial">Psychosocial</option>
                <option value="Hearing">Hearing</option>
                <option value="Cancer">Cancer</option>
                <option value="Rare Disease">Rare Disease</option>
              </select>
            </div>
            <Line 
              options={lineOptions}
              data={chartDataWithForecast}
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

        <ColumnedContainer>
          <Container>
            <div className='mb-8'>
              <ContainerTitle text='PWD by Barangay' />
              <p className='text-gray-500 text-sm'>PWDs per barangay</p> 
            </div>

            <Bar
                options={barOptions}
                data={pwdBarangayData}
                height={100}
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