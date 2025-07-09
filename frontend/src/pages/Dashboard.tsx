import { Accessibility, FileUser, UserRoundX } from "lucide-react";
import Card from "../components/Dashboard/Card";
import RegistrationChart from "../components/Analytics/RegistrationChart";
import DisabilityChart from "../components/Analytics/DisabilityChart";
import GenderChart from "../components/Analytics/GenderChart";

function Dashboard() {
  return (
    <div>
      {/* welcome */}
      <p>Welcome NAME HERE!</p>

      {/* card container */}
      <div className="flex gap-4 mt-5">
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
          icon={<UserRoundX size={60}/>}
        />

      </div>

      {/* charts */}
      <div className="mt-5">
        {/* line chart */}
        <div>
          <RegistrationChart />
        </div>

        <div className="flex gap-4 mt-5">
          <div className="flex-1">
            <DisabilityChart />
          </div>

          <div className="flex-1">
            <GenderChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;