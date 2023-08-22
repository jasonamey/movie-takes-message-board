import React from "react";
import Image from "next/image";
import { type Reply as ReplyType } from "@/types";
import { createUsername } from "@/utils/helpers";
import { format } from "date-fns";

interface ReplyProps {
  reply: ReplyType;
}

export const Reply = ({ reply }: ReplyProps) => {
  const { author, content } = reply;
  return (
    <li className="flex items-start border-b-[1px] border-white-300 pb-3 pt-4 last:border-none last:pb-0">
      {author.name && author.image && (
        <Image
          className="mr-8 rounded-full"
          alt={`icon for ${author.name}`}
          src={author.image}
          width={40}
          height={40}
        />
      )}
      <div className="flex flex-col gap-1">
        <p className="block text-base font-bold leading-none text-blue-300">
          {author.name}
        </p>
        <p className="mb-2 text-sm">{createUsername(author.email as string)}</p>
        <p>{content}</p>
        <span className="self-start text-[8px] italic">
          {format(new Date(reply.createdAt), "PPpp")}
        </span>
      </div>
    </li>
  );
};
