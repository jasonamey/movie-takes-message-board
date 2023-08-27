import { type Reply as ReplyType } from "@/types";
import { Reply } from "./Reply";

interface ReplyListProps {
  replies: ReplyType[];
}

export const ReplyList = ({ replies }: ReplyListProps) => {
  return (
    <ul className="col-span-11 col-start-2">
      {replies &&
        replies.map((item, idx) => (
          <Reply
            key={item.id}
            reply={item}
            isLast={idx === replies.length - 1}
          />
        ))}
    </ul>
  );
};
