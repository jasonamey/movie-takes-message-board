import React from "react";
import { type Reply as ReplyType } from "@/types";
import { Reply } from "./Reply";

interface ReplyListProps {
  replies: ReplyType[];
}

export const ReplyList = ({ replies }: ReplyListProps) => {
  return (
    <ul className="-mt-4">
      {replies && replies.map((item) => <Reply key={item.id} reply={item} />)}
    </ul>
  );
};
