

interface DropdownProps {
    label?: string,
    fieldName: string,
    options: Record<string, string>,
    initialValue?: string, 
    expand?: boolean,
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Dropdown = ({label, fieldName, options, initialValue='Select', expand=false, onChange}: DropdownProps) => {
  return (
    <div className={`flex flex-col ${expand ? 'flex-1' : ''}`}>
        {label && <label htmlFor={fieldName} className="mb-2">{label}</label>}

        <select name={fieldName} id={fieldName} defaultValue={initialValue}  className='select select-sm px-2 w-full' onChange={onChange}>
            <option disabled={true}>{initialValue}</option>
            
           {Object.entries(options).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
           ))}
        </select>
    </div>
  )
}

export default Dropdown