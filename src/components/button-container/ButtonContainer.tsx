import { Button } from "../ui";

interface ButtonContainerProps {
  variant: "edit" | "create";
  submitFn: () => void;
  cancelFn: () => void;
  deleteFn?: () => void;
}

export const ButtonContainer = ({
  variant,
  submitFn,
  cancelFn,
  deleteFn,
}: ButtonContainerProps) => {
  return (
    <div className="flex w-full flex-row-reverse items-center justify-between">
      <div className="flex gap-2">
        <Button
          variant="cancel"
          onClick={(e) => {
            e.preventDefault();
            cancelFn();
          }}
        >
          Cancel
        </Button>
        <Button
          variant="submit"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            submitFn();
          }}
        >
          Add Feedback
        </Button>
      </div>
      {variant == "edit" && deleteFn !== undefined && (
        <Button
          variant="delete"
          onClick={(e) => {
            e.preventDefault();
            deleteFn();
          }}
        >
          Delete
        </Button>
      )}
    </div>
  );
};
