/* 
    the radioName array holds the values/name of the radio
    ex (Male, Female), which then creates input type radio
    based on the number of radioName
*/

interface RadioProps {
    label: string,
    name: string,
    radioField: Record<string, string>,
    register: any
}

const Radio = ({label, name, radioField, register}: RadioProps) => {
  return (
    <div>
        <label htmlFor={name}>{label}</label>
        
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