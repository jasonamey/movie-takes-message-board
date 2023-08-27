import { Take } from "./Take";
import { type TakesResponse } from "@/types";

interface TakesListProps {
  takes: TakesResponse[];
}

export const TakesList = ({ takes }: TakesListProps) => {
  return (
    <section className="mt-2 flex min-h-[500px] w-full flex-col items-center gap-2">
      {takes.map((item) => (
        <Take key={item.title} takeResult={item} />
      ))}
    </section>
  );
};
