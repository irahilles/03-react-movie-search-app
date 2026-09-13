import toast, { Toaster } from 'react-hot-toast';
import fetchMovies from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import css from './App.module.css';
import type { Movie } from '../../types/movies';
import { useState } from 'react';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);

    const handleSearch = async (query: string) => {
        try {
            setLoader(true);
            setError(false);
            setMovies([]);
            const data = await fetchMovies(query);
            if (data.length === 0) {
                toast.error('No movies found for your request.')
                return;
            }
            setMovies(data);
        } catch (error) {
            setError(true);
            console.error(error);
        } finally {
            setLoader(false);
        }
    }
    const handleSelect = (movie: Movie) => {
        setSelectedMovie(movie);
    }
    const handleCloseModal = () => {
        setSelectedMovie(null);
    }
    return (
        <div className={css.app}>
        <Toaster/>
            <SearchBar onSubmit={handleSearch} />
            {loader ? (<Loader />) : error ? (<ErrorMessage />) : (movies.length > 0 && <MovieGrid onSelect={handleSelect} movies={movies} />)}
            {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleCloseModal} />}
</div>
    )
}