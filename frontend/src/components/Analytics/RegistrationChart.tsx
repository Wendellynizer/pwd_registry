import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import CustomContainer from "../CustomContainer";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const RegistrationChart = () => {
  const data = {
    labels: ["February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Actual",
        data: [200, 230, 260, 290, 320, 350],
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        tension: 0.3,
        fill: false,
      },
      // {
      //   label: "Forecast",
      //   data: [520, 580, 650, 720, 780, 840],
      //   borderColor: "#ef4444",
      //   backgroundColor: "#ef4444",
      //   // borderDash: [5, 5],
      //   tension: 0.3,
      //   fill: false,
      // },
    ],
  };

  const options = {
    responsive: true,
    plugins: { 
			legend: { 
				position: "top" as const ,
			} 
		},
    scales: {
      y: {
        beginAtZero: true,
        // title: { display: true, text: "no. of registry" },
      },
      x: { title: { display: true, text: "months" } },
    },
  };

  return (
    <CustomContainer>
      <p className="font-semibold mb-5">PWD Registration</p>
      <Line data={data} options={options} className="w-full" height={80} />
    </CustomContainer>
  );
};

export default RegistrationChart;
