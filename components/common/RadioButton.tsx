import { RadioButtonProps } from '@/types';
import React from 'react';

  const RadioButton: React.FC<RadioButtonProps> = ({ name, value, label, checked, onChange }) => {
    return (
    <label className="inline-flex items-center mt-2">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="form-radio h-5 w-5  text-[#E36414] border" 
      />
      <span className="mr-3">{label}</span>
    </label>
  );
};

export default RadioButton;
