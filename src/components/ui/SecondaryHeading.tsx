interface SecondaryHeadingProps {
  headingText: string;
}

export const SecondaryHeading = ({ headingText }: SecondaryHeadingProps) => {
  return (
    <h2 className="mb-8 text-2xl font-bold text-blue-300">{headingText}</h2>
  );
};
