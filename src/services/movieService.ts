import type { Movie } from './../types/movie';
import axios from 'axios';

interface MovieHttpResponse {
  results: Movie[];
}

export default async function fetchMovies(query: string): Promise<Movie[]> {
  const myKey = import.meta.env.VITE_TMDB_TOKEN;
  const url = `https://api.themoviedb.org/3/search/movie`;

  const options = {
    params: {
      query,
      language: 'en-US',
      page: 1,
    },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  };

  const response = await axios.get<MovieHttpResponse>(url, options);

  return response.data.results;
}
