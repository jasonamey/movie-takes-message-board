import React from "react";
import { cn } from "@/utils/helpers";

interface PageLayoutProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const PageLayout = ({ children, className }: PageLayoutProps) => {
  return (
    <div className={cn("flex flex-col items-center pb-10 sm:pt-6", className)}>
      {children}
    </div>
  );
};
