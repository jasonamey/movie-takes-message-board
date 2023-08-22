import React, { useState, useRef, useCallback } from "react";
import { DropDownButton } from "./DropDownButton";
import { DropDownItems } from "./DropDownItems";
import { useOnClickOutside } from "@/hooks/useClickOutside";
import { DROPDOWN_STYLES } from "@/utils/constants";
import { cn } from "@/utils/helpers";

interface DropDownPickerProps {
  selectFn: (item: string) => void;
  choices: { name: string; id: string }[];
  selected: string;
  color: "blue" | "white";
  width: "full" | number;
  label: string;
  classNames?: string;
}

export const DropDownPicker = ({
  choices,
  selectFn,
  selected,
  color,
  width,
  label,
}: DropDownPickerProps) => {
  const [isDropDownViewable, changeIsDropDownViewable] = useState(false);

  const divElement = useRef<HTMLDivElement>(null);

  useOnClickOutside(divElement, () => changeIsDropDownViewable(false));

  const { buttonBackground, margin } = DROPDOWN_STYLES[color];
  const outlineClass =
    color == "white" && isDropDownViewable ? "outline outline-blue-200" : "";

  const buttonClickHandler = useCallback(() => {
    changeIsDropDownViewable(!isDropDownViewable);
  }, [isDropDownViewable]);

  const dropDownClickHandler = useCallback(
    (item: (typeof choices)[number]["id"]) => {
      selectFn(item);
      setTimeout(() => {
        changeIsDropDownViewable(false);
      }, 400);
    },
    [selectFn]
  );

  return (
    <div
      ref={divElement}
      className={cn(
        "relative flex w-full items-center",
        buttonBackground,
        outlineClass,
        margin
      )}
    >
      <DropDownButton
        label={label}
        color={color}
        clickHandler={buttonClickHandler}
        isDropDownViewable={isDropDownViewable}
      />
      {isDropDownViewable && (
        <DropDownItems
          choices={choices}
          selectFn={dropDownClickHandler}
          selected={selected}
          width={width}
        />
      )}
    </div>
  );
};
