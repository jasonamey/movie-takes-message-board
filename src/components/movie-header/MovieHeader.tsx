import Image from "next/image";
import { Container } from "@/components/ui";
import { formatRuntime, formatDate } from "@/utils/helpers";
import { type TakesResponse, type MovieData } from "@/types";
import { type Vote } from "@prisma/client";
import { Take } from "../take-list";

interface MovieHeaderProps {
  movie: MovieData;
  numComments: number;
  numVotes: number;
  content: string;
  takeId: string;
  votes: Vote[];
  genre: string;
  authorEmail: string;
  authorId: string;
}

export const MovieHeader = ({
  movie,
  numComments,
  numVotes,
  content,
  takeId,
  votes,
  genre,
  authorEmail,
  authorId,
}: MovieHeaderProps) => {
  const takeResult: TakesResponse = {
    content,
    genre,
    id: takeId,
    numComments,
    numVotes,
    title: movie.title,
    votes,
    releaseDate: movie.releaseDate,
    authorEmail,
    authorId,
  };
  return (
    <Container
      variant="primary"
      className="flex flex-col gap-6 divide-y divide-white-300"
    >
      <div className="flex flex-col gap-4 md:flex-row">
        <Image
          className="self-center rounded-md"
          src={movie.posterPath}
          width={200}
          height={500}
          alt={`poster for ${movie.title}`}
        />
        <div className="flex flex-col items-start justify-center text-gray">
          <h1 className="mb-1 text-5xl font-bold text-blue-400">
            {movie.title}
          </h1>
          <p className="mb-4 text-gray">{movie.tagline}</p>
          <p className="mb-4">
            Release Date:
            <span className="font-bold">
              {` ${formatDate(new Date(movie.releaseDate))}`}
            </span>
          </p>
          <p>
            Budget:
            <span className="font-bold">{` ${movie.budget.toLocaleString(
              "en-US",
              {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
                maximumSignificantDigits: 4,
              }
            )}`}</span>
          </p>
          <p className="mb-4 ">
            Box Office:
            <span className="font-bold">{` ${movie.revenue.toLocaleString(
              "en-US",
              {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
                maximumSignificantDigits: 4,
              }
            )}`}</span>
          </p>
          <p>
            Runtime:{" "}
            <span className="font-bold">{` ${formatRuntime(
              movie.runtime
            )}`}</span>
          </p>
        </div>
      </div>
      <Take takeResult={takeResult} headerTake={true} />
    </Container>
  );
};
