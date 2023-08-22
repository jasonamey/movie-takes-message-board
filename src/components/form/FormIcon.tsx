import React from "react";
import Image from "next/image";
import { cn } from "@/utils/helpers";

interface FormIconProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: "edit" | "create";
}

export const FormIcon = ({ variant, className }: FormIconProps) => {
  const imgString =
    variant === "edit" ? "icon-edit-feedback.svg" : "icon-new-feedback.svg";
  return (
    <div
      className={cn(
        "relative h-[40px] w-[40px] sm:h-[60px] sm:w-[60px]",
        className
      )}
    >
      <Image
        src={`assets/shared/${imgString}`}
        alt="add feedback icon"
        layout="fill"
      />
    </div>
  );
};

{
  /* <div className="to-blue-500 from-3% flex h-[40px] w-[40px] items-center justify-center rounded-full bg-gradient-to-tr  from-blue-200 from-20% via-purple to-light-red sm:h-[60px] sm:w-[60px]">
<svg
  className="hidden sm:block"
  width="24"
  height="24"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 256 256"
>
  <path
    fill="white"
    d="M224,216H183.36A103.95,103.95,0,1,0,128,232h96a8,8,0,0,0,0-16ZM40,128a88,88,0,1,1,88,88A88.1,88.1,0,0,1,40,128Zm88-24a24,24,0,1,0-24-24A24,24,0,0,0,128,104Zm0-32a8,8,0,1,1-8,8A8,8,0,0,1,128,72Zm24,104a24,24,0,1,0-24,24A24,24,0,0,0,152,176Zm-32,0a8,8,0,1,1,8,8A8,8,0,0,1,120,176Zm56-24a24,24,0,1,0-24-24A24,24,0,0,0,176,152Zm0-32a8,8,0,1,1-8,8A8,8,0,0,1,176,120ZM80,104a24,24,0,1,0,24,24A24,24,0,0,0,80,104Zm0,32a8,8,0,1,1,8-8A8,8,0,0,1,80,136Z"
  />
</svg>
</div> */
}
