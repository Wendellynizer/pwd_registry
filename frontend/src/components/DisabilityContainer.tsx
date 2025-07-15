import { Trash } from "lucide-react";
import Dropdown from "./Inputs/Dropdown";

type DisabilityField = 'disability_cause' | 'disability_type_name';

interface DisabilityContainerProps {
  index: number,
  cause: string,
  disabilityName: string,
  onRemove: (index: number) => void,
  onChange: (index: number, field: DisabilityField, value: string) => void,
  disabled?: boolean
}

const DisabilityContainer = ({index, cause, disabilityName, onRemove, onChange, disabled=false}: DisabilityContainerProps) => {
  return (
    <div className="border border-gray-300 rounded-md flex overflow-hidden">
      <div className="grid grid-cols-4 flex-1 gap-4 py-3 px-4 bg-gray-100">
        <div>
          <Dropdown fieldName={cause} 
            options={{
              'Inborn':'Congenital/Inborn', 
              'Acquired':'Acquired'
            }} 
            initialValue="Select Cause"
            expand
            onChange={e => onChange(index, 'disability_cause', e.target.value)}
           />
        </div>
        
        <div className="col-span-3">
          <Dropdown fieldName={disabilityName}
          options={{'Amputee': 'Amputee', 'Mental': 'Mental'}} 
          initialValue="Select Disability"
          expand
          onChange={e => onChange(index, 'disability_type_name', e.target.value)}
          />
        </div>
      </div>
    
      <div className="flex border-s-gray-300">
        <button type="button"
         className="bg-red-400 text-white px-3 cursor-pointer hover:bg-red-500 active:bg-red-600" 
         onClick={() => onRemove(index)} disabled={disabled}> 
          <Trash />
        </button>
      </div>
    </div>
  );
};

export default DisabilityContainer;