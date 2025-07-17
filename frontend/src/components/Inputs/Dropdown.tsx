import type {UseFormRegister} from 'react-hook-form';

type Option = {
  key: string | number;
  value: string;
}

interface DropdownProps {
    label?: string,
    name: string,
    options: Record<string, string>,
    initialValue?: string
    expand?: boolean,
		value?: string
    register?: UseFormRegister<any>,
		onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown = ({
    label, 
		name, 
    options, 
		initialValue='Select', 
    register, 
		value, 
		onChange,
		expand=false,
}: DropdownProps) => {

	const isControlled = typeof value !== 'undefined' && typeof onChange === 'function';

  return (
    <div className={`flex flex-col ${expand ? 'flex-1' : ''}`}>
        {label && <label htmlFor={name} className="mb-2">{label}</label>}

        <select 
						className='select select-sm px-2 w-full' 
            id={name} 
            {...(isControlled
							? { value, onChange }
							: register
							? register(name)
							: {defaultValue: ''})
						}						
        >
          <option>{initialValue}</option>
            
          {Object.entries(options).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
          ))}

          {/* {options.map((opt) => (
            <option key={opt.key} value={opt.value}>{opt.value}</option>
          ))} */}
        </select>
    </div>
  )
}

export default Dropdown