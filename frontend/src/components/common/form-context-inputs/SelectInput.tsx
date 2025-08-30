import { useFormContext } from "react-hook-form";

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectInputProps {
  label?: string;
  name: string;
  selectOptions?: SelectOption[];
  defaultValue?: string;
  required?: boolean;
  value?: string | number;
  onChange?: (value: any) => void;
}

const SelectInput = ({
  label,
  name,
  selectOptions = [],
  defaultValue = "--Select--",
  required = false,
  onChange,
  ...rest
}: SelectInputProps) => {
  const { register } = useFormContext();

  // console.log("SelectInput options:", selectOptions, Array.isArray(selectOptions));

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="mb-2 flex items-center">
          {label}
          {required && (
            <>
              <span className="text-red-500 me-2">*</span>
              <span className="text-xs text-gray-400">(required)</span>
            </>
          )}
        </label>
      )}

      <select className="select select-sm" {...register(name)} {...rest}>
        <option value="">--Select--</option>
        
        {selectOptions.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
