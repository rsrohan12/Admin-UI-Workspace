"use client";
import React from "react";

type TProps = {
  label: string;
  children?: any;
  labelClassName?: string;
};

export const Label = ({ label, children, labelClassName }: TProps) => {
  if (!label) return <></>;
  return (
    <span className={`${labelClassName ?? ''} mb-2 block text-sm font-semibold leading-[16.94px] text-[#151F4E]`}>
      {label} {children}
    </span>
  );
};
