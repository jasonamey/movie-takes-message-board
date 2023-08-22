import React, { type FC } from "react";
import { cn } from "@/utils/helpers";
import { cva } from "class-variance-authority";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "submit" | "delete" | "cancel" | "edit";
  className?: string;
}

export const buttonVariants = cva(
  "sm:text-md text-sm text-white-100 inline-flex cursor-pointer  justify-center rounded-lg px-4 py-2 font-medium transition-colors active:scale-95 disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-purple",
        submit: "bg-purple",
        delete: "bg-red",
        cancel: "bg-blue-300",
        edit: "bg-blue-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const Button: FC<ButtonProps> = ({
  variant,
  children,
  className,
  ...props
}) => {
  return (
    <button className={cn(buttonVariants({ variant }), className)} {...props}>
      {children}
    </button>
  );
};

Button.displayName = "Button";
