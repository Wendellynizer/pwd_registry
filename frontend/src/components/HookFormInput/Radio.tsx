import { useFormContext } from "react-hook-form";

interface SelectOption {
  label: string;
  value: string | number;
}

interface RadioProps {
    label?: string;
    name: string;
    options: SelectOption[];
    defaultValue?: string;
		required?: boolean;
}

const RadioGroup = ({ label, name, options = [], defaultValue = '', required=false, ...rest }: RadioProps) => {
  
    const { register } = useFormContext();
    
    return (
    <div className="mb-4">
      {label && 
          <label htmlFor={name} className='mb-2 flex items-center'>{label} 
          {required && 
            <>
            <span className="text-red-500 me-2">*</span>
            <span className="text-xs text-gray-400">(required)</span>
            </> }
        </label>}

      <div className="flex gap-4">
        {options.map(({ label, value }) => (
          <label key={value} className="flex items-center gap-1">
            <input
							className="radio radio-sm text-[#437057]"
              type="radio"
              value={value}
              defaultChecked={defaultValue === value}
              {...register(name)}
              {...rest}
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
