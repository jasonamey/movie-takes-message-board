"use client";

import { ButtonContainer } from "../button-container/ButtonContainer";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactElement[];
  submitHandler: () => void;
  variant: "edit" | "create";
}
export const Form = ({ children, submitHandler }: FormProps) => {
  return (
    <form className="relative flex h-full w-full flex-col gap-1 rounded-md bg-white-100">
      {children}
      <ButtonContainer
        variant="create"
        submitFn={submitHandler}
        cancelFn={() => {
          console.log("hello");
        }}
      />
    </form>
  );
};
