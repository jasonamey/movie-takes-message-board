import React from "react";
import Link from "next/link";

interface GoBackProps {
  color: "blue" | "white";
}

export const GoBack = ({ color }: GoBackProps) => {
  return (
    <div className="flex items-center justify-start gap-4">
      <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 9L2 5l4-4"
          stroke={color === "white" ? "#ffffff" : "#4661E6"}
          strokeWidth="2"
          fill="none"
          fillRule="evenodd"
        />
      </svg>
      <Link href="/" className="text-blue-300">
        Go Back
      </Link>
    </div>
  );
};
