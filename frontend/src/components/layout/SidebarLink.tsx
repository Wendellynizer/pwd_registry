import { NavLink } from "react-router";

interface SidebarLinkProps {
  icon: React.ReactNode;
  linkName: string;
  to: string;
}

const SidebarLink = ({ icon, linkName, to }: SidebarLinkProps) => {

	const defaultStyle = "flex items-center gap-3 p-2 rounded-md text-sm";
	const activeStyle = "bg-white text-[#2D4F2B] font-semibold text-sm";
	const hoverStyle = "hover:bg-white hover:text-[#2D4F2B] hover:font-semibold";

  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        `${defaultStyle} ${ isActive && activeStyle } ${hoverStyle}`
      }
    >
      {icon}
      <span>{linkName}</span>
    </NavLink>
  );
};

export default SidebarLink;