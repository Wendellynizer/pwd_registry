import React, { type ReactNode } from 'react'

interface CardProps {
    title: string,
    value: number,
    icon: React.ReactNode
}

const Card = ({title, value, icon}: CardProps) => {
  return (
    <div className='flex grow justify-between items-center gap-5 px-4 py-5 border rounded-sm'>
        <div className='space-y-2'>
            <p className='text-lg'>{title}</p>
            <p className='text-4xl'>{value}</p>
        </div>

        {icon}
    </div>
  )
}

export default Card