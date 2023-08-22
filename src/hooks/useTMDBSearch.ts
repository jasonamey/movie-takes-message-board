import { useEffect, useState } from "react";
import axios from "axios"
import { env } from "@/env.mjs"
import { type Movie } from 'tmdb-ts';
import { prepareForSearchQuery } from "@/utils/helpers";

interface Response { 
  page: number, 
  results: Movie[], 
  total_pages: number,
  total_results: number
}

export const useTMDBSearch = (term: string) => {
  const [movies, setMovies] = useState<Movie[]>([])
  useEffect(() => {
    setMovies([])
    const getFilms = async () => {
      const response  = await axios.get<Response>(`${env.NEXT_PUBLIC_TMDB_BASE_URL}${prepareForSearchQuery(term)}&api_key=${env.NEXT_PUBLIC_TMDB_API_KEY}`)       
        const { data } = response
      return data
    }
    if (term) {
    getFilms()
      .then(data => {
        setMovies(data.results)
      })
      .catch(err => console.log("Error fetching movies from TMDB", err))
    }
  },[term])

  return { 
    movies
  }
  
}