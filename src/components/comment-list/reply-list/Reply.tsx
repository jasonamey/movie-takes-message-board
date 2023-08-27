import Image from "next/image";
import { type Reply as ReplyType } from "@/types";
import { createUsername } from "@/utils/helpers";
import { format } from "date-fns";

interface ReplyProps {
  reply: ReplyType;
  isLast: boolean;
}

export const Reply = ({ reply, isLast }: ReplyProps) => {
  const { author, content } = reply;
  return (
    <li className="xs:gap-x-0 group grid grid-cols-11 items-center gap-x-2 gap-y-3 border-white-300 pt-4 first:border-t-[1px]">
      {author.name && author.image && (
        <Image
          className="col-span-2 rounded-full sm:col-span-1 sm:mr-4"
          alt={`icon for ${author.name}`}
          src={author.image}
          width={40}
          height={40}
        />
      )}
      <div className="col-span-8">
        <p className="text-base font-bold leading-none text-blue-300">
          {author.name}
        </p>
        <p className="col-start-2 text-sm">
          {createUsername(author.email as string)}
        </p>
      </div>
      <p className="col-span-10 col-start-1 leading-5 sm:col-span-8 sm:col-start-2">
        {content}
      </p>
      <span className="col-span-6 col-start-1 self-start text-[8px] italic sm:col-start-2">
        {format(new Date(reply.createdAt), "PPpp")}
      </span>
      <hr className="col-span-12 col-start-2 border-white-300 group-last:hidden" />
    </li>
  );
};
