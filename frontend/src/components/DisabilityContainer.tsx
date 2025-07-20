import { Trash } from "lucide-react";
import { Controller } from "react-hook-form";
import type { Control } from 'react-hook-form';
import Dropdown from "./Inputs/Dropdown";

type FormShape = {
  applicant: {
    applicant_disabilities: {
      disability_cause: string;
      disability: any;
    }[];
  }
};

interface DisabilityContainerProps {
  index: number;
  control: Control<FormShape>;
  remove: (index: number) => void;
  disabled?: boolean;
  disabilityOption: Record<string, string>;
}


const DisabilityContainer = ({index, control, remove, disabilityOption, disabled=false}: DisabilityContainerProps) => {
  return (
    <div className="border border-gray-300 rounded-md flex overflow-hidden">
      <div className="grid grid-cols-4 flex-1 gap-4 py-3 px-4 bg-gray-100">
        <div>
          <Controller
            name={`applicant.applicant_disabilities.${index}.disability_cause`}
            control={control}
            defaultValue=""
            render={({field}) => (
              <Dropdown 
                {...field}
                options={{'Inborn':'Congenital/Inborn', 'Acquired':'Acquired'}} 
                initialValue="Select Cause"
                expand
              />
            )}
          />
        </div>
        
        <div className="col-span-3">
          <Controller
            name={`applicant.applicant_disabilities.${index}.disability`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Dropdown
                {...field}
                options={disabilityOption}
                initialValue="Select Disability"
                expand
              />
          )}
        />
        </div>
      </div>
    
      <div className="flex border-s-gray-300">
        <button
          type="button"
          onClick={() => remove(index)}
          disabled={disabled}
          className="bg-red-400 text-white px-3 hover:bg-red-500 active:bg-red-600 disabled:opacity-50"
        >
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
};

export default DisabilityContainer;