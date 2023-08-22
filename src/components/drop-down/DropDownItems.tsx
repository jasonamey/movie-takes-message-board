import React from "react";
import { type Choice } from "@/types";

interface DropDownItemsProps {
  choices: Choice[] | undefined;
  selected?: string;
  selectFn: (item: string) => void;
  width: number | "full";
}

export const DropDownItems = ({
  choices,
  selected,
  selectFn,
  width,
}: DropDownItemsProps) => {
  return (
    <ul
      className={`dropdown-content absolute left-0 top-[60px] z-20 ${
        width === "full" ? "w-full" : `w-[${width}px]`
      } overflow-hidden rounded-md bg-white-100 text-gray shadow-xl`}
    >
      {choices?.map((item) => (
        <li
          key={item.id}
          className="flex w-full cursor-pointer items-center justify-between border-b-[1px] border-white-300 p-2 text-sm hover:bg-white-200"
          onClick={(e) => {
            e.stopPropagation();
            selectFn(item.name);
          }}
        >
          {item.name}
          {selected === item.name && (
            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 5.233L4.522 9 12 1"
                stroke="#647196"
                strokeWidth="2"
                fill="none"
                fillRule="evenodd"
              />
            </svg>
          )}
        </li>
      ))}
    </ul>
  );
};
