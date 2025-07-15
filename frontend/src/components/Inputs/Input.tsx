import React from 'react';

interface InputProps {
    label?: string,
    fieldName: string,
    type?: string,
    defaultValue?: string,
    placeholder?: string,
    disabled?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({label, fieldName, type='input', placeholder, defaultValue, disabled, onChange}: InputProps) => {
  return (
    <div className='flex flex-1 flex-col'>
        {label && <label htmlFor={fieldName} className='mb-2'>{label}</label>}
        
        <input 
        type={type}
        id={fieldName} 
        className='input input-sm rounded-sm border border-gray-400 px-2 py-3 w-full' 
        name={fieldName} 
        {...(onChange && { onChange })}
        value={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        />
    </div>
  )
}

/*
ang  {...(onChange && { onChange })}  statement means if walay 
onChange function na gi provide, walay onChange attrubute ang malagay sa input element. If naa, ilagay niya.
*/

export default Input