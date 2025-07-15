import React from 'react'

/* 
    the radioName array holds the values/name of the radio
    ex (Male, Female), which then creates input type radio
    based on the number of radioName
*/

interface RadioProps {
    label: string,
    fieldName: string,
    radioField: Record<string, string>,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Radio = ({label, fieldName, radioField, onChange}: RadioProps) => {
  return (
    <div>
        <label htmlFor={fieldName}>{label}</label>
        
        <div className='flex gap-4 mt-3'>
            {Object.entries(radioField).map(([key, value]) => (
                <div className='space-x-1' key={key}>
                    <input 
                        type="radio" 
                        className='radio' 
                        name={fieldName} 
                        id={key} 
                        value={key} 
                        key={key}
                        onChange={onChange}/>
                    <label htmlFor={key}>{value}</label>
                </div>
            ))}

            {/* {radioName.map((name, idx) => (
                <div className='space-x-1' key={idx}>
                    <input 
                        type="radio" 
                        className='radio' 
                        name="gender" 
                        id={fieldName} 
                        value={name} 
                        key={idx}/>
                    <span>{name}</span>
                </div>
            ))} */}
        </div>
        
    </div>
  )
}

export default Radio