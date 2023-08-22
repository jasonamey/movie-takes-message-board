import { type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "@/server/api/root";
import { type Movie } from "tmdb-ts";
import { type Vote } from "@prisma/client";

type RouterOutput = inferRouterOutputs<typeof AppRouter>;

type Choice = {
  name: string;
  id: string;
};

type MovieSearched = {
  poster: string;
  year: string | undefined;
  title: string;
  id: number;
};

type MovieData = {
  budget: number;
  releaseDate: string;
  revenue: number;
  posterPath: string;
  tagline: string;
  title: string;
  budget: number;
  runtime: number;
};

type DropDownOptionsType = {
  id: string | number;
  name: string;
  choices: { id: string; name: string }[];
  selectFn: (item: string) => void;
  selected: string;
  subLabel: string;
};

type TakesResponse = {
  title: string;
  numVotes: number;
  numComments: number;
  id: string;
  content: string;
  authorEmail: string;
  releaseDate: string;
  votes: Vote[];
  genre: string;
};

interface Response {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface Author {
  email: string | null;
  id: string;
  image: string | null;
  name: string | null;
  emailVerified: Date | null;
}

interface Reply {
  author: Author;
  content: string;
  createdAt: Date;
  id: string;
}
