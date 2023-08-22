import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useTMDBSearch, useDebounce } from "@/hooks";
import { SearchInput, DropDownPicker, GoBack } from "@/components";
import { Form, FormLabel, FormIcon, FormHeader } from "@/components/form";
import { PageLayout, LargeInput } from "@/components/ui";
import { api } from "@/utils/api";
import { formatMovieSearchResults, formatMovieData } from "@/utils/helpers";
import { STATUSES, GENRE_TAGS } from "@/utils/constants";
import { env } from "@/env.mjs";
import { type MovieSearched, type MovieData } from "@/types";
import { type MovieDetails } from "tmdb-ts";

const CreatePage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [movieSearched, setMovieSearched] = useState<MovieSearched | null>(
    null
  );
  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [movieTake, setMovieTake] = useState("");

  const router = useRouter();

  const createMovie = api.movies.create.useMutation();
  const createTake = api.takes.create.useMutation();

  useDebounce(searchValue, setDebouncedValue, setMovieSearched);
  const { movies } = useTMDBSearch(debouncedValue);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}` },
    };
    if (movieSearched !== null) {
      (async () => {
        const response = await axios.get<MovieDetails>(
          ` https://api.themoviedb.org/3/movie/${movieSearched.id}`,
          config
        );
        const { data } = response;
        setMovieData(formatMovieData(data));
      })().catch((err) => console.log("Error fetching movie on data", err));
    }
  }, [movieSearched]);

  const submitHandler = async () => {
    if (movieData !== null) {
      const movie = await createMovie.mutateAsync({ ...movieData });
      if (
        movieTake !== null &&
        selectedGenre !== null &&
        selectedStatus !== null
      ) {
        await createTake.mutateAsync({
          movieId: movie.id,
          content: movieTake,
          title: movie.title,
          genre: selectedGenre,
          status: selectedStatus,
          releaseYear: movie.releaseDate.split("-")[0] as string,
        });
      }
    }
    await router.push("/");
  };

  return (
    <PageLayout>
      <div className="flex flex-grow flex-col gap-10 sm:w-[540px]">
        <GoBack color="blue" />
        <div className="relative flex h-full w-full flex-col gap-1 rounded-md bg-white-100 p-8 py-12">
          <FormIcon variant="create" className="absolute -translate-y-20" />
          <FormHeader
            film={movieSearched}
            formHeader="Create a New Movie Take"
          />
          <>
            <FormLabel
              label="Movie"
              subLabel="Find a movie you want to share a take about"
            />
            <SearchInput
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              choices={formatMovieSearchResults(movies).slice(0, 5)}
              setMovie={(item) => {
                setMovieSearched(item);
                setDebouncedValue("");
              }}
              className="mb-6"
            />
            <Form variant="create" submitHandler={() => void submitHandler()}>
              <FormLabel label="Genre" subLabel="Pick a genre for your movie" />
              <DropDownPicker
                color="white"
                width="full"
                selected={selectedGenre}
                choices={GENRE_TAGS}
                selectFn={setSelectedGenre}
                label={selectedGenre !== "" ? selectedGenre : "Genre"}
              />
              <FormLabel label="Status" subLabel="Have you seen this?" />
              <DropDownPicker
                color="white"
                width="full"
                selected={selectedStatus}
                choices={STATUSES}
                selectFn={setSelectedStatus}
                label={selectedStatus !== "" ? selectedStatus : "Status"}
              />
              <FormLabel label="Movie Take" subLabel="Share your movie take" />
              <LargeInput largeInput={movieTake} setLargeInput={setMovieTake} />
            </Form>
          </>
        </div>
      </div>
    </PageLayout>
  );
};

export default CreatePage;
