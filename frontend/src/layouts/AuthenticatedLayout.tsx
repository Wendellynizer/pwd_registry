import { Outlet } from "react-router";
import Sidebar from "@components/layout/Sidebar";
import Navbar from "@components/layout/Navbar";
import { useState } from "react";

const SIDEBAR_WIDTH = "w-66";

const AuthenticatedLayout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [contentLeftMargin, setContentLeftMargin] = useState('ml-66');

  // toggles the sidebar close/open
  // and sets the margin-left for the content
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setContentLeftMargin(sidebarOpen ? 'ml-0' : 'ml-66');
  }

  return (
    <div className="font-poppins flex h-screen overflow-hidden">
      <Sidebar width={SIDEBAR_WIDTH} sidebarOpen={sidebarOpen} />

      <main className={`flex flex-col grow transition-all duration-300 ${contentLeftMargin}`}>
        <Navbar title="Dashboard" toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        
        <div className=" bg-gray-50 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AuthenticatedLayout;
