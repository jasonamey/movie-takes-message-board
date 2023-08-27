import classNames from "classnames";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant: "primary" | "secondary";
  hideOnMobile?: boolean;
  className?: string;
}

export const Container = ({
  children,
  variant,
  hideOnMobile,
  className,
}: ContainerProps) => {
  const containerStyles = `w-full rounded-md bg-white-100 relative`;
  const containerVariants = {
    primary: "p-8",
    secondary: "p-4",
  };
  const mobileDisplay = hideOnMobile ? "hidden sm:block" : "";

  return (
    <div
      className={classNames(
        containerStyles,
        containerVariants[variant],
        mobileDisplay,
        className
      )}
    >
      {children}
    </div>
  );
};
