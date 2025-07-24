
type InputProps = {
    type?: 'text' | 'date' | 'email',
    label?: string,
    name: string,
    register: any,
    placeholder?: string,
    defaultValue?: string,
    disabled?: boolean
    required?: boolean
}

const Input = ({type='text', label, name, defaultValue, disabled=false, required=true, placeholder, register}: InputProps) => {
  return(
    <div className='flex flex-1 flex-col'>
        {label && 
          <label htmlFor={name} className='mb-2 flex items-center'>{label} 
          {required && 
            <>
            <span className="text-red-500 me-2">*</span>
            <span className="text-xs text-gray-400">(required)</span>
            </> }
        </label>}
        
        <input 
          className='input input-sm rounded-sm border border-gray-400 px-2 py-3 w-full'
          id={name}
          type={type}
          {...register(name)}
          // defaultValue={defaultValue}
          // defaultValue={type != 'text'? '' : defaultValue}
          disabled={disabled}
          placeholder={placeholder}
        />
    </div>
  );
}

export default Input