import React from "react";

interface FormLabelProps {
  label: string;
  subLabel: string;
}

export const FormLabel = ({ label, subLabel }: FormLabelProps) => {
  return (
    <>
      <h3 className="m-0 text-xl font-bold text-blue-300">{label}</h3>
      <h4 className="mb-4 text-gray">{subLabel}</h4>
    </>
  );
};
