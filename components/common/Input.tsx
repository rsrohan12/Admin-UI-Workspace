import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef } from 'react';
import { ErrorMessage } from '@/components/common';

export type TInputProps = InputHTMLAttributes<HTMLInputElement> & {
  errorText?: any | string;
  label?: string;
  inverted?: boolean;
  labelClassName?: string;
  inputContainerClassName?: string;
  inputClassName?: string;
  labelClass?: string;
  disabled?: boolean;
  isMandatory?: boolean;
  hoursInput?: boolean;
  addText?: string;
  dynamicWidth?:string,
};

const styles = {
  inverted: {
    inputContainer:
      'hover:border-[#BBBFD1] focus-within:!text-[#151F4E] focus-within:!border-[#2B3E9B]',
  },
  default: {
    inputContainer:
      'focus-within:border-[#F6F7FF] focus-within:text-[#F6F7FF] hover:border-[#838AA9] hover:focus-within:border-[#F6F7FF] focus:border-[#F6F7FF]',
  },
};

export const Input = forwardRef<HTMLInputElement, TInputProps>(
  (
    {
      labelClassName,
      inputContainerClassName,
      inputClassName,
      label,
      labelClass,
      errorText = '',
      type = 'text',
      inverted = false,
      disabled = false,
      isMandatory = false,
      hoursInput = false,
      addText,
      dynamicWidth="w-full",
      ...props
    },
    ref,
  ) => {
    const inputThemeType = inverted ? 'inverted' : 'default';

    return (
      <>
        {label && (
          <label className={labelClass}>
            {label} {isMandatory && <small className="text-danger">*</small>}
          </label>
        )}
        <div
          className={clsx(
            'flex w-full rounded-lg',
            inverted
              ? 'border-transparent text-[#151F4E]'
              : 'border-transparent bg-[#363A55]',
            errorText
              ? 'border-[#DB4A46]'
              : styles[inputThemeType].inputContainer,
            inputContainerClassName,
          )}>
          {!hoursInput && (
            <input
              {...props}
              ref={ref}
              type={type}
              disabled={disabled}
              className={clsx(
                'form-input w-full bg-transparent p-3 leading-[16.94px] outline-none focus:ring-0',
                disabled ? '!bg-[#f5f5f5] cursor-not-allowed' : '',
                inputClassName,
              )}
            />
          )}

          {hoursInput && (
            <div
              className={clsx(
                'flex flex-row items-center rounded-lg border-2',
                disabled ? 'bg-gray-50 text-gray-400' : '',
                inputClassName,
              )}>
              <input
                {...props}
                ref={ref}
                type={type}
                disabled={disabled}
                readOnly={disabled}
                className={clsx(
`form-input ${dynamicWidth} border-none bg-transparent p-3 leading-[16.94px] outline-none focus:ring-0`,
                  disabled ? ' text-gray-400' : '',
                  inputClassName,
                )}
              />
              {hoursInput && <h1 className="pr-4">{addText}</h1>}
            </div>
          )}
        </div>
        {errorText && <ErrorMessage errorText={errorText} />}
      </>
    );
  },
);
