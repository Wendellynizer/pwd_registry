// import React, { type ReactNode } from 'react'

interface CardProps {
    title: string,
    value: number,
    icon: React.ReactNode
}

const Card = ({title, value, icon}: CardProps) => {
  return (
    <div className='bg-white flex grow justify-between items-center gap-5 px-4 py-5 border border-gray-300 rounded-sm'>
        <div className='space-y-2'>
            <p className=''>{title}</p>
            <p className='text-4xl font-medium'>{value}</p>
        </div>

        {icon}
    </div>
  )
}

export default Card