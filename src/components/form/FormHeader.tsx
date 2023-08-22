import React from "react";

interface FormHeaderProps {
  film?: { title: string; year: string | undefined } | null;
  formHeader: string;
}

export const FormHeader = ({ film, formHeader }: FormHeaderProps) => {
  return (
    <>
      <h1 className="text-2xl font-bold text-blue-300">{`${formHeader} on : `}</h1>
      <h2 className="mb-4 h-6 text-3xl font-bold text-blue-200">
        {film?.title} {film ? " - " : ""} {film?.year}
      </h2>
    </>
  );
};
