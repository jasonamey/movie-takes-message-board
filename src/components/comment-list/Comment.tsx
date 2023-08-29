import React, { useState } from "react";
import type { User } from "@prisma/client";
import Image from "next/image";
import { api } from "@/utils/api";
import { Button, LargeInput } from "../ui";
import { ReplyList } from "./reply-list";
import { createUsername } from "@/utils/helpers";
import { format } from "date-fns";

interface CommentProps {
  comment: { content: string; author: User; id: string; createdAt: Date };
  isLoggedIn: boolean;
}

export const Comment = ({ comment, isLoggedIn }: CommentProps) => {
  const [showReplyBox, setReplyBox] = useState(false);
  const [reply, setReply] = useState("");
  const { content, author, id: commentId } = comment;
  const ctx = api.useContext();
  const { data: replies } = api.replies.byId.useQuery({ id: commentId });
  const createReply = api.replies.create.useMutation({
    onSuccess: async () => {
      void (await ctx.replies.byId.invalidate());
      setReply("");
      setReplyBox(false);
    },
    onError: (error) => {
      console.log("Error when submitting a reply", error);
    },
  });
  const submitHandler = async () => {
    await createReply.mutateAsync({
      content: reply,
      commentId,
    });
  };
  return (
    <li className="xs:gap-x-0 grid grid-cols-12 gap-x-2 gap-y-3 border-b-[1px] border-white-300 pb-4 pt-4 last:border-none">
      {author.name && author.image && (
        <Image
          className="col-span-2 rounded-full sm:col-span-1 sm:mr-4"
          alt={`icon for ${author.name}`}
          src={author.image}
          width={40}
          height={40}
        />
      )}
      <div className="col-span-6">
        {author.email && author.name && (
          <>
            <span className="block text-base font-bold leading-none text-blue-300">
              {author.name}
            </span>
            <span>{createUsername(author.email)}</span>
          </>
        )}
      </div>
      {isLoggedIn && (
        <button
          className="col-span-1 col-start-12 text-sm text-blue-200 hover:underline"
          onClick={() => setReplyBox(!showReplyBox)}
        >
          {showReplyBox ? "No Reply" : "Reply"}
        </button>
      )}
      <span className="col-span-11 col-start-1 leading-5 sm:col-span-9 sm:col-start-2 ">
        {content}
      </span>
      <span className="col-span-6 col-start-1 self-start text-[8px] italic sm:col-start-2">
        {format(new Date(comment.createdAt), "PPpp")}
      </span>
      {showReplyBox && (
        <div className="col-span-10 col-start-1 flex flex-col items-start justify-between gap-2 sm:col-start-2 sm:flex-row">
          <LargeInput largeInput={reply} setLargeInput={setReply} />
          <Button
            variant="submit"
            className="w-[96px] px-2 text-sm"
            onClick={() => void submitHandler()}
          >
            Post Reply
          </Button>
        </div>
      )}
      {replies && replies?.length > 0 && (
        <ReplyList replies={replies} commentAuthorAt={author.email} />
      )}
    </li>
  );
};
