import React from "react";
import CustomContainer from "../CustomContainer";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
	BarElement,
} from "chart.js";

ChartJS.register(
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const DisabilityChart = () => {

  const data = {
		labels: [
			"Visual",
			"Hearing",
			"Mobility",
			"Cognitive",
			"Self-care",
			"Communication"
		],

		datasets: [
    {
      label: "No. of PWD",
      data: [120, 80, 150, 60, 40, 30], // example values
      backgroundColor: [
        "#3b82f6",
        "#ef4444",
        "#f59e42",
        "#10b981",
        "#a78bfa",
        "#fbbf24"
      ],
      borderRadius: 6,
      barPercentage: 0.6,
    }
  ]
	}

  return (
    <CustomContainer>
      <p className="font-semibold mb-5">Disability Type</p>

      <div style={{ height: 300 }}>
        <Bar data={data} height={300} options={{ maintainAspectRatio: false }} />
      </div>
    </CustomContainer>
  );
};

export default DisabilityChart;
