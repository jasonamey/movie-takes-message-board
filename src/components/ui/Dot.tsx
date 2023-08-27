interface DotProps {
  color: "BLUE" | "PURPLE" | "ORANGE";
}

const COLORS = {
  PURPLE: "bg-purple",
  BLUE: "bg-blue-300",
  ORANGE: "bg-orange",
};

export const Dot = ({ color }: DotProps) => {
  return <div className={`h-2 w-2 rounded-full ${COLORS[color]}`}></div>;
};
