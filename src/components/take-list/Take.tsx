import React from "react";
import Link from "next/link";
import { type TakesResponse } from "@/types";
import { VoteButton } from "./VoteButton";
import { CommentBadge } from "./CommentBadge";
import { createUsername } from "@/utils/helpers";
import { Tag } from "../ui";

interface TakeProps {
  takeResult: TakesResponse;
  headerTake?: boolean;
}

export const Take = ({ takeResult, headerTake = false }: TakeProps) => {
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
  } = takeResult;

  return (
    <article
      className={`relative flex ${
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
    </article>
  );
};
