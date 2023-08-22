import React from "react";
import { api } from "@/utils/api";
import { Dot } from "@/components/ui";
import StatusBoxSkeleton from "./StatusBoxSkeleton";

const COLORS = {
  have: "ORANGE",
  need: "PURPLE",
  want: "BLUE",
};

type COLORS_TYPE = typeof COLORS;
type COLORS_KEY = keyof COLORS_TYPE;

export const StatusBox = () => {
  const { data: statuses, isLoading } = api.takes.getStatus.useQuery();

  const statusesArray = Object.entries(statuses || {});

  if (isLoading) {
    return <StatusBoxSkeleton />;
  }

  return (
    <div className="h-auto w-full gap-2 rounded-md bg-white-100 p-4 text-gray sm:h-full">
      <ul className="flex flex-col  gap-6">
        {statusesArray.map((item) => {
          const colorKey = item[0].split(" ")[0]?.toLowerCase() as COLORS_KEY;
          return (
            <li key={item[0]} className="flex items-center justify-between">
              <span className="flex items-center justify-start gap-2">
                <Dot color={COLORS[colorKey] as "ORANGE" | "PURPLE" | "BLUE"} />
                {item[0]}
              </span>
              <span>{item[1]}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
