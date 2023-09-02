import { type Reply as ReplyType } from "@/types";
import { Reply } from "./Reply";

interface ReplyListProps {
  replies: ReplyType[];
  commentAuthorAt: string;
}

export const ReplyList = ({ replies, commentAuthorAt }: ReplyListProps) => {
  return (
    <ul className="col-span-11 col-start-2">
      {replies &&
        replies.map((item) => (
          <Reply key={item.id} reply={item} commentAuthorAt={commentAuthorAt} />
        ))}
    </ul>
  );
};
