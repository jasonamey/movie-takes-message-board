import Link from "next/link";
import { useSession } from "next-auth/react";
import { type TakesResponse } from "@/types";
import { VoteButton } from "./VoteButton";
import { CommentBadge } from "./CommentBadge";
import { createUsername } from "@/utils/helpers";
import { Tag, TrashIcon } from "../ui";
import { api } from "@/utils/api";

interface TakeProps {
  takeResult: TakesResponse;
  headerTake?: boolean;
}

export const Take = ({ takeResult, headerTake = false }: TakeProps) => {
  const ctx = api.useContext();
  const session = useSession();
  const deleteTake = api.takes.delete.useMutation({
    onSuccess: async () => {
      await ctx.takes.invalidate();
    },
  });

  const userId = session.data?.user.id;
  const {
    title,
    numComments,
    id,
    content,
    authorEmail,
    releaseDate,
    numVotes,
    votes,
    genre,
    authorId,
  } = takeResult;
  return (
    <article
      className={`group relative flex ${
        headerTake ? "w-full" : "w-11/12"
      } flex-wrap items-center justify-between rounded-md bg-white-100 ${
        headerTake ? "pt-8" : "p-4"
      } sm:w-full sm:flex-row sm:flex-nowrap`}
    >
      <VoteButton numVotes={numVotes} takeId={id} votes={votes} />
      <Link
        href={`/take/${id}`}
        className="order-first mb-4 w-full sm:order-none"
      >
        {!headerTake && (
          <h4 className="text-3xl font-bold text-blue-400">
            {`${title} (${releaseDate?.split("-")[0] as string})`}
          </h4>
        )}
        <div className="mt-1 flex flex-col">
          <span className="text-xs text-gray">
            {`${createUsername(authorEmail)}'s take:`}
          </span>
          <p className="relative mb-2 text-xl font-semibold text-blue-200">
            {`"${content.replace(/"/g, "'")}"`}
          </p>

          <Tag canBeSelected={false}>{genre}</Tag>
        </div>
      </Link>
      <CommentBadge numComments={numComments} />
      {authorId === userId && (
        <button
          onClick={() => {
            void deleteTake.mutateAsync({ id });
          }}
          className="absolute right-4 top-4 opacity-100 transition-opacity duration-500 group-hover:opacity-100 sm:opacity-0"
        >
          <TrashIcon width={20} height={20} color="#CDD2EE" />
        </button>
      )}
    </article>
  );
};
