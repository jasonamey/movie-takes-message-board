import { Button } from "../ui";
import { LargeInput, SecondaryHeading } from "../ui";

interface CommentBoxProps {
  submitHandler: () => void;
  comment: string;
  inputHandler: (input: string) => void;
}

export const CommentBox = ({
  submitHandler,
  comment,
  inputHandler,
}: CommentBoxProps) => {
  const warningClass = comment.length > 251 ? "text-red" : "text-gray";

  return (
    <div className="w-full bg-white-100 p-8">
      <SecondaryHeading headingText="Add Comment" />
      <LargeInput largeInput={comment} setLargeInput={inputHandler} />
      <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <span className={warningClass}>{`You have ${
          256 - comment.length
        } character${comment.length === 255 ? "" : "s"} left`}</span>
        <Button onClick={submitHandler} variant="submit">
          Post Comment
        </Button>
      </div>
    </div>
  );
};
