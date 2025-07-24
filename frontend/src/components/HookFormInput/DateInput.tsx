import { useFormContext } from "react-hook-form";

type DateInputProps = {
  label?: string;
  name: string;
  placeholder?: string;
    required?: boolean;
};

const DateInput = ({label, name, placeholder, required, ...rest}: DateInputProps) => {
  
    const { register } = useFormContext();
    
    return (
    <div className="flex flex-1 flex-col">
      {label && 
          <label htmlFor={name} className='mb-2 flex items-center'>{label} 
          {required && 
            <>
            <span className="text-red-500 me-2">*</span>
            <span className="text-xs text-gray-400">(required)</span>
            </> }
        </label>}

      <input
        className="input input-sm rounded-sm border border-gray-400 px-2 py-3 w-full"
        id={name}
        type='date'
        placeholder={placeholder}
        {...register(name)}
        {...rest}
      />
    </div>
  );
};

export default DateInput;
