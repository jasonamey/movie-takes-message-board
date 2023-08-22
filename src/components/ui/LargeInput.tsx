import React from "react";

interface LargeInputProps {
  largeInput: string;
  setLargeInput: (item: string) => void;
  isDisabled?: boolean;
}

export const LargeInput = ({
  largeInput,
  setLargeInput,
  isDisabled,
}: LargeInputProps) => {
  return (
    <textarea
      rows={3}
      value={largeInput}
      onChange={(e) => setLargeInput(e.target.value)}
      className="w-full cursor-pointer resize-none rounded-md border-none bg-white-200 px-4 py-4 text-gray"
      disabled={isDisabled}
    ></textarea>
  );
};
