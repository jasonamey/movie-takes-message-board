import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type Movie, type MovieDetails } from "tmdb-ts";
import { type Vote } from "@prisma/client";
import { type TakesResponse } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function prepareForSearchQuery(term: string) {
  return term.split(" ").join("%20");
}

export function formatMovieSearchResults(results: Movie[]) {
  return results.map((item) => ({
    id: item.id,
    title: item.title,
    year: item.release_date.split("-")[0],
    poster: `https://image.tmdb.org/t/p/original${item.poster_path}`,
  }));
}

export function formatMovieData(result: MovieDetails) {
  const {
    poster_path,
    backdrop_path,
    title,
    release_date,
    budget,
    revenue,
    tagline,
    runtime,
  } = result;
  return {
    posterPath: `https://image.tmdb.org/t/p/original${
      poster_path ? poster_path : backdrop_path
    }`,
    title,
    releaseDate: release_date,
    budget,
    revenue,
    tagline,
    runtime,
  };
}

export function formatRuntime(runtime: number) {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}hr${minutes !== 0 ? `${minutes}min` : ""}`;
}

export function formatDate(dateToFormat: Date) {
  return `${dateToFormat.toLocaleString("default", {
    month: "long",
  })} ${dateToFormat.getDay()}, ${dateToFormat.getFullYear()}`;
}

export function createUsername(email: string) {
  return `@${email.split("@")[0] as string}`;
}

export function hasVoted(votes: Vote[], userId: string) {
  return votes.some((item) => item.userId === userId);
}

export function sortTakesResponse(takes: TakesResponse[], filter: string[]) {
  if (filter[1] === "comments") {
    takes.sort((a, b) => {
      return filter[0] === "most"
        ? b.numComments - a.numComments
        : a.numComments - b.numComments;
    });
  } else {
    takes.sort((a, b) => {
      return filter[0] === "most"
        ? b.numVotes - a.numVotes
        : a.numVotes - b.numVotes;
    });
  }
}
