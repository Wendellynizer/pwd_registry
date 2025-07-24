import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="font-poppins flex">
      <Sidebar />

      <main className="flex-1 sm:ml-66 h-screen overflow-hidden">
        <Navbar title="Dashboard" />
        
        <div className="h-[calc(100vh-4rem)] overflow-y-auto bg-gray-50">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
