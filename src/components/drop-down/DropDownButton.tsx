import { cn } from "@/utils/helpers";
import { DROPDOWN_STYLES } from "@/utils/constants";

interface DropDownProps {
  label: string;
  clickHandler: () => void;
  isDropDownViewable: boolean;
  color: "white" | "blue";
}

export const DropDownButton = ({
  label,
  isDropDownViewable,
  color,
  clickHandler,
}: DropDownProps) => {
  const { chevron, buttonBackground, buttonText } = DROPDOWN_STYLES[color];

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        clickHandler();
      }}
      className={cn(
        `m-0 flex w-full cursor-pointer items-center justify-between gap-2 border-none px-4 ${
          color === "blue" ? "py-0" : "py-4"
        } outline-none sm:p-4`,
        buttonBackground,
        buttonText
      )}
    >
      {label}
      <svg
        width="10"
        height="7"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-all ${isDropDownViewable ? "rotate-180" : ""}`}
      >
        <path
          d="M1 6l4-4 4 4"
          stroke={chevron}
          strokeWidth="2"
          fill="none"
          fillRule="evenodd"
        />
      </svg>
    </button>
  );
};
