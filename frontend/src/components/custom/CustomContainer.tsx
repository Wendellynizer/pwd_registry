import React from 'react'

const CustomContainer = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='border border-gray-100 px-4 py-4 rounded-sm shadow-md'>
        {children}
    </div>
  )
}

export default CustomContainer