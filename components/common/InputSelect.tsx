import clsx from 'clsx';
import Select from 'react-select';
import { StateManagerProps } from 'react-select/dist/declarations/src/stateManager';
import { ErrorMessage, Label } from '@/components/common';

type Props = StateManagerProps & {
  label?: string;
  errorText?: string | any;
  isMulti?: boolean; // Optional prop to indicate if multiple selections are allowed
  controlClassName?: string;
  isMandatory?: boolean;
  menuPlacement?: string;
  innerClassName?: string;
  labelClassName?: string;
};

export const InputSelect = ({
  label,
  errorText,
  isMulti = false, // Default to false, making single selection the default behavior
  controlClassName,
  isMandatory = false,
  menuPlacement,
  innerClassName,
  labelClassName,
  ...props
}: Props) => {
  return (
    <div className={innerClassName ?? ''}>
      <Label label={label ?? ''} labelClassName={labelClassName}>
        {isMandatory && <small className="text-danger">*</small>}
      </Label>
      <Select
       menuPortalTarget={document.body} 
       menuPosition="absolute"
       styles={{
         menuPortal: (base: any) => ({ ...base, zIndex: 9999999 }), 
       }}
        menuPlacement={menuPlacement ?? 'bottom'}
        classNames={{
          control: () =>
            clsx(
              'hover:!border-[#BBBFD1] text-[#838AA9] !border-[#e2e2e2]',
              'hover:focus-within:!border-[#a93030] focus-within:!border-[#2B3E9B] focus-within:text-[#151F4E]',
              'text-sm font-semibold !rounded-[6px] border-[1px] p-[3px]',
              controlClassName,
            ),
          indicatorSeparator: () => 'hidden',
          indicatorsContainer: () => 'cursor-pointer',
          menu: () => '!bg-[#F3F4F9] z-9999999',
          singleValue: () => '!text-[currentColor]',
          option: () => {
            return clsx(
              '!text-[#151F4E] hover:!bg-[#2B3E9B] hover:!text-white !bg-transparent',
            );
          },
        }}
        isMulti={isMulti} 
        // styles={{
        //   menu: provided => ({
        //     ...provided,
        //     maxHeight: '180px', 
        //     overflowY: 'auto', 
        //     zIndex: 9999, 
        //   }),
        //   control: provided => ({
        //     ...provided,
        //     zIndex: 1, 
        //   }),
        // }}
        {...props}
      />
      {errorText && <ErrorMessage errorText={errorText} />}
    </div>
  );
};
