import { Trash } from "lucide-react";
import { Controller } from "react-hook-form";
import type { Control } from 'react-hook-form';
import Dropdown from "./Dropdown";

type FormShape = {
  applicant_disability: {
    disability_cause: string;
    disability_type_name: string;
  }[];
};

interface DisabilityContainerProps {
  index: number;
  control: Control<FormShape>;
  remove: (index: number) => void;
  disabled?: boolean;
}


const DisabilityContainer = ({index, control, remove, disabled=false}: DisabilityContainerProps) => {
  return (
    <div className="border border-gray-300 rounded-md flex overflow-hidden">
      <div className="grid grid-cols-4 flex-1 gap-4 py-3 px-4 bg-gray-100">
        <div>
          <Controller
            name={`applicant_disability.${index}.disability_cause`}
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
            name={`applicant_disability.${index}.disability_type_name`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Dropdown
                {...field}
                options={{ Amputee: "Amputee", Mental: "Mental" }}
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