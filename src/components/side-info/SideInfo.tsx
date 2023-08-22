import React from "react";
import { HeaderBox } from "./HeaderBox";
import { StatusBox } from "./StatusBox";
import { TagBox } from "./TagBox";

export const SideInfo = () => {
  return (
    <div className="mb-0 mr-4 flex w-full items-stretch justify-between gap-4 text-white-100 sm:mb-4 lg:w-1/4 lg:flex-col">
      <HeaderBox />
      <div className="bg-white hidden h-auto sm:block sm:w-1/3 md:w-full">
        <StatusBox />
      </div>
      <div className="bg-white hidden h-auto sm:block sm:w-1/3 md:w-full">
        <TagBox />
      </div>
    </div>
  );
};
