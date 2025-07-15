import React from 'react';
import { Menu } from 'lucide-react';

const Navbar = ({title}: {title: string}) => {
  return (
    <div className='bg-white py-2 px-4 flex justify-between border-b-2 border-[#437057]'>

        <div className='flex items-center gap-5'>
            <button type="button" className='hover:cursor-pointer text-[#437057] hover:bg-[#437057] hover:text-white active:bg-[#2F5249] rounded-sm transition-colors'>
                <Menu />
            </button>

            <p className='font-semibold'>{title}</p>
        </div>
        
        <div className='flex items-center gap-5'>
          <p>Time</p>

          {/* avatar */}
          <div className='bg-neutral text-neutral-content w-10 h-10 rounded-full grid place-content-center hover:cursor-pointer'>
            <span className='text-xs'>SY</span>
          </div>
        </div>
    </div>
  )
}

export default Navbar