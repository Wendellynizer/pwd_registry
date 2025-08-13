import { LogOut, User, UserRound } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const NavbarMenu = () => {
  return (
    <div className="flex flex-col bg-white rounded-md overflow-hidden border border-gray-300">
      <MenuLink title="Account" icon={<UserRound />} />
      <MenuLink title="Logout" icon={<LogOut />} />
    </div>
  );
};

export default NavbarMenu;

const MenuLink = ({ to='/', title, icon }: { to?: string, title: string; icon: any }) => {
  return(
    <Link to={to} className="text-sm py-3 px-3 flex items-center gap-4 hover:bg-gray-100">
        {icon}

        <span>{title}</span>
    </Link>
  );
};
