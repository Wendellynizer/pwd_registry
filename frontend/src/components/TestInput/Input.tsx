
type InputProps = {
    type?: 'text' | 'date' | 'email',
    label?: string,
    name: string,
    defaultValue?: string,
    disabled?: boolean
    register: any,
}

const Input = ({type='text', label, name, defaultValue, disabled=false, register}: InputProps) => {
  return(
    <div className='flex flex-1 flex-col'>
        {label && <label htmlFor={name} className='mb-2'>{label}</label>}
        
        <input 
          className='input input-sm rounded-sm border border-gray-400 px-2 py-3 w-full'
          type={type}
          {...register(name)}
          
          defaultValue={defaultValue}
          disabled={disabled}
        />
    </div>
  );
}

export default Input