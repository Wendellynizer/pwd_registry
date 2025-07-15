import React from 'react'

interface ButtonProps  {
    label?: string,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = ({label, onClick}: ButtonProps) => {
  return (
    <button type='button' className='border rounded-md px-3 py-1 cursor-pointer'
      onClick={onClick} >
        {label ? label : 'Button'}
    </button>
  )
}

export default Button;