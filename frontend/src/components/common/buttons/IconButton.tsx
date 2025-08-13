import React from 'react'

interface IconButtonProps  {
    label?: string,
}

const IconButton = ({label}: IconButtonProps) => {
  return (
    <button type='button' className='border rounded px-2 py-1'>
        {label ? label : 'Button'}
    </button>
  )
}

export default IconButton;