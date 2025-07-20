import { Link, NavLink } from "react-router";
import {
  LayoutDashboard,
  Clipboard,
  Accessibility,
  Info,
  UsersRound,
  Map,
  ChartNoAxesCombined,
  FileChartPie,
  LogOut,
} from "lucide-react";

// const scheme = useState({
//   darkBlue: {
//     primary: '#1B3C53',
//   },
//   green: {
//     primary: '#FFB823',
//   }
// });

interface SidebarLinkProps {
  icon: React.ReactNode;
  linkName: string;
  to: string;
}

const SidebarLink = ({ icon, linkName, to }: SidebarLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        `flex items-center gap-3 p-2 rounded-md hover:bg-white hover:text-[#2D4F2B] hover:font-semibold ${ isActive ? 'bg-white text-[#2D4F2B] font-semibold' : ''}`
      }
    >
      {icon}
      <span>{linkName}</span>
    </NavLink>
  );
};

const Sidebar = () => {
  return (
    <aside className={`bg-[#437057] overflow-hidden fixed top-0 left-0 z-40 w-66 h-screen transition-transform -translate-x-full sm:translate-x-0 text-sm`}>
      <nav className="w-full text-white text-sm">
        <Link
          to={"/"}
          className="border-b py-3 px-4 mb-5 flex items-center gap-2"
        >
          <Accessibility size={32} />
          <span className="font-bold">PWD Registry</span>
        </Link>

        <ul className="px-4 space-y-2">
          <li className="mb-5">
            <p className="text-xs">MENU</p>
            <SidebarLink
              icon={<LayoutDashboard />}
              linkName="Dashboard"
              to="/"
            />
          </li>

          <li>
            <p className="text-xs">MANAGEMENT</p>
            <SidebarLink
              icon={<Accessibility />}
              linkName="PWD"
              to="/pwd"
            />
          </li>

          <li>
            <SidebarLink
              icon={<Clipboard />}
              linkName="Application"
              to="/application"
            />
          </li>

          <li>
            <SidebarLink
              icon={<Info />}
              linkName="Disability"
              to="/disability"
            />
          </li>

          <li>
            <SidebarLink
              icon={<UsersRound />}
              linkName="Personnel"
              to="/personnel"
            />
          </li>

          <li>
            <p className="text-xs">OTHERS</p>
            <SidebarLink icon={<Map />} linkName="Map" to="/map" />
          </li>

          <li>
            <SidebarLink
              icon={<ChartNoAxesCombined />}
              linkName="Analytics"
              to="/analytics"
            />
          </li>

          <li>
            <SidebarLink
              icon={<FileChartPie />}
              linkName="Reports"
              to="/reports"
            />
          </li>

          <li>
            <SidebarLink
              icon={<LogOut />}
              linkName="Logout"
              to="/logout"
            />
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;