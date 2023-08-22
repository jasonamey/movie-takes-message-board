import React from "react";
import { api } from "@/utils/api";
import { type Vote } from "@prisma/client";
import { hasVoted } from "@/utils/helpers";
import { useSession } from "next-auth/react";

interface VoteButtonProps {
  numVotes: number;
  takeId: string;
  votes: Vote[];
}

export const VoteButton = ({ numVotes, takeId, votes }: VoteButtonProps) => {
  const ctx = api.useContext();
  const upVote = api.votes.upVote.useMutation({
    onSuccess: () => {
      void ctx.takes.invalidate();
    },
  });
  const session = useSession();
  const userId = session.data?.user.id;

  const buttonDisabled = hasVoted(votes, userId || "");
  return (
    <button
      disabled={buttonDisabled}
      onClick={() => void upVote.mutateAsync({ voteType: "UP", takeId })}
      className="mr-8 flex min-w-[56px] cursor-pointer flex-row items-center justify-center gap-2 rounded-lg border-none bg-white-300 px-3 py-1 disabled:cursor-auto sm:h-[60px] sm:w-[44px] sm:flex-col sm:gap-1 sm:self-center sm:px-4 sm:py-2"
    >
      {!buttonDisabled && (
        <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 6l4-4 4 4"
            stroke="#4661E6"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      )}
      <span className="text-2xl font-bold text-blue-200">{numVotes}</span>
    </button>
  );
};
