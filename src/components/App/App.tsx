import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar"
import fetchMovies from "../../services/movieService";
import type { Movie } from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

const notify = () => toast.error('No movies found for your request.')

export default function App() {

  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState<Movie | null>(null)

  const openModal = (movie: Movie) => setIsModalOpen(movie)
  const closeModal = () => setIsModalOpen(null)


  const handleSearch = async (queryMovie: string) => {

    try {

      setMovies([])
      setError(false)
      setLoading(true)

      const data = await fetchMovies(queryMovie)

      // Задержка, чтоб Loader отображался 1 секунду

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (data.length === 0) {
        notify()
        return
      }

      setMovies(data)

    } catch {
      setError(true)

    } finally {
      setLoading(false)
    }

  }

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {!isLoading && movies.length > 0 && (
        <MovieGrid onSelect={openModal} movies={movies} />
      )}

      {isModalOpen && <MovieModal onClose={closeModal} movie={isModalOpen} />}
    </>
  )
}