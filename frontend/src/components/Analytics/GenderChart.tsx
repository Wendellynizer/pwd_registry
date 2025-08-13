import CustomContainer from "../custom/CustomContainer";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

ChartJS.register(
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const GenderChart = () => {
  const data = {
  labels: ["Male", "Female"],
  datasets: [
    {
      label: "Gender Distribution",
      data: [180, 220], // example values
      backgroundColor: [
        "#3b82f6", // blue for Male
        "#ef4444", // red for Female
        "#fbbf24"  // yellow for Other
      ],
      borderWidth: 1,
    }
  ]
};

  return (
    <CustomContainer>
      <p className="font-semibold mb-5">Disability Type</p>

      <div style={{ height: 300 }}>
        <Pie data={data} height={300} options={{ maintainAspectRatio: false }} />
      </div>
    </CustomContainer>
  );
};

export default GenderChart;
