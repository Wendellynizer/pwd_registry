// DisabilityContainer.tsx
import { Trash } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import SelectInput from '@components/common/form-context-inputs/SelectInput';

interface DisabilityContainerProps {
  index: number;
  remove: (index: number) => void;
  disabled?: boolean;
  disabilityOption: [];
}

const DisabilityContainer = ({
  index,
  remove,
  disabled = false,
  disabilityOption,
}: DisabilityContainerProps) => {
  const { control } = useFormContext();

  return (
    <div className="border border-gray-300 rounded-md flex overflow-hidden">
      <div className="grid grid-cols-4 flex-1 gap-4 py-3 px-4 bg-gray-100">
        <div>
          <Controller
            name={`applicant.applicant_disabilities.${index}.disability_cause`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <SelectInput
                {...field}
                options={[
                  {label: "Congenital/Inborn", value: "Inborn"},
                  {label: "Acquired", value: "Acquired"},
                ]}
              />
            )}
          />
        </div>

        <div className="col-span-3">
          <Controller
            name={`applicant.applicant_disabilities.${index}.disability`}
            control={control}
            render={({ field }) => (
              <SelectInput
                {...field}
                options={disabilityOption}
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
