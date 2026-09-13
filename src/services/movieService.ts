import axios from "axios";
import type { Movie } from "../types/movies";

interface FetchMoviesResponse {
    results: Movie[],
}

const URL = 'https://api.themoviedb.org/3/search/movie';

export default async function fetchMovies(query: string):Promise<Movie[]>{
    
const myKey = import.meta.env.VITE_API_KEY;
 const response = await axios.get<FetchMoviesResponse>(URL, {
    params: {
      query,
    },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
 })
    return response.data.results;
}