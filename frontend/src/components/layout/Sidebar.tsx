import { Link } from "react-router";
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

import SidebarLink from '@components/layout/SidebarLink';

interface Props {
  width: string
  sidebarOpen: boolean
}


const Sidebar = ({width, sidebarOpen=true}: Props) => {
  return (
    <aside className={`bg-[#437057] shadow overflow-hidden fixed inset-y-0 transition-transform duration-300 ${width} ${!sidebarOpen && '-translate-x-full'}`}>
      <nav className="w-full text-white">
        <Link
          to={"/"}
          className="border-b py-3 px-4 mb-5 flex items-center gap-2"
        >
          <Accessibility size={32} />
          <span className="font-bold">PWD Registry</span>
        </Link>

        <ul className="px-4 space-y-1">
          <li className="mb-5">
            <LinkGroupName name="GENERAL" />
            <SidebarLink
              icon={<LayoutDashboard />}
              linkName="Dashboard"
              to="/"
            />
          </li>

          <li>
            <LinkGroupName name="MANAGEMENT" />
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

          <li className="mb-5">
            <SidebarLink
              icon={<UsersRound />}
              linkName="Personnel"
              to="/personnel"
            />
          </li>

          <li>
            <LinkGroupName name="OTHERS" />
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


const LinkGroupName = ({name}: {name: string}) => {

  return <p className="text-xs capitalize mb-2">{ name }</p>;
}