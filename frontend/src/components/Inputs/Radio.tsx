/* 
    the radioName array holds the values/name of the radio
    ex (Male, Female), which then creates input type radio
    based on the number of radioName
*/

interface RadioProps {
    label: string,
    name: string,
    register: any
    radioField: Record<string, string>,
    required?: boolean
}

const Radio = ({label, name, radioField, required=true, register}: RadioProps) => {
  return (
    <div>
        {label && 
          <label htmlFor={name} className='mb-2 flex items-center'>{label} 
          {required && 
            <>
            <span className="text-red-500 me-2">*</span>
            <span className="text-xs text-gray-400">(required)</span>
            </> }
        </label>}
        
        <div className='flex gap-4 mt-3'>
            {Object.entries(radioField).map(([key, value]) => (
                <div className='space-x-1' key={key}>
                    <input 
                        type="radio"
                        {...register(name)} 
                        className='radio' 
                        id={key} 
                        value={key} 
                        key={key}
                    />
                    <label htmlFor={key}>{value}</label>
                </div>
            ))}
        </div>
        
    </div>
  )
}

export default Radio