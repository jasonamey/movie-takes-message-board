import React, { type FC } from "react";

interface TagProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  canBeSelected?: boolean;
}

export const Tag: FC<TagProps> = ({
  children,
  selected,
  canBeSelected,
  ...props
}) => {
  const isSelectedClasses = !selected
    ? `bg-white-300 text-blue-200 ${
        canBeSelected ? `hover:text-white-100 hover:bg-light-blue` : ""
      }`
    : "bg-blue-200 text-white-100";

  return (
    <button
      className={`inline w-auto cursor-pointer self-start rounded-xl border-none px-4 py-2 text-sm font-medium tracking-wide ${isSelectedClasses}`}
      {...props}
    >
      {children}
    </button>
  );
};
