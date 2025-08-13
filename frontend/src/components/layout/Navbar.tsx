import { ChevronDown, PanelRightClose, PanelRightOpen } from "lucide-react";
import default_profile from "@assets/images/default.png";
import NavbarMenu from "@components/layout/Partials/NavbarMenu";
import { useState } from "react";

interface Props {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Navbar = ({ sidebarOpen, toggleSidebar }: Props) => {

  const [menuOpen, setMenuOpen] = useState(false);

  // controls the toggling of menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <div
      className={`bg-white py-2 px-4 flex justify-between border-b-2 border-[#437057]`}
    >
      <div className="flex items-center gap-5">
        <button
          type="button"
          className="rounded-sm transition-colors p-1 hover:cursor-pointer text-[#437057] hover:bg-[#437057] hover:text-white active:bg-[#2F5249] "
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <PanelRightOpen /> : <PanelRightClose />}
        </button>

        {/* <p className='font-semibold'>{title}</p> */}

        <div></div>
      </div>

      <div className="relative flex items-center gap-5">
        {/* <p>Time</p> */}
        {/* notifications */}

        {/* avatar */}
        <div className="relative bg-gray-100 w-10 h-10 rounded-full hover:cursor-pointer hover:outline-2 outline-gray-300"
          onClick={toggleMenu}>
          <img
            src={default_profile}
            alt="profile"
            className="w-full h-full rounded-full object-cover"
          />

          <ChevronDown size={15} className="absolute right-0 -bottom-1 rounded-full bg-gray-200 text-gray-600" />
        </div>

        {/* menu */}
        <div className={`absolute z-99 top-full right-0 mt-3 w-[160px] transition-all duration-100 ${menuOpen ? 'opacity-100' : 'opacity-0'} `}>
            <NavbarMenu />
          </div>
      </div>
    </div>
  );
};

export default Navbar;
