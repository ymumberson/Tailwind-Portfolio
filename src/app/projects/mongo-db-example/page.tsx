'use client';
import Project from "@/app/components/Project";
import React, { useEffect } from "react";
import { Movie, getMoviesPaged, getMovieCount } from "./utils";

const MOVIES_PER_PAGE = 5;

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
    const [imageError, setImageError] = React.useState(false);

    return (
        <div className="flex flex-col md:flex-row items-center bg-neutral-primary-soft border rounded-md p-4 shadow-xs">
            {!imageError && movie.poster ? (
                <img 
                    className="object-cover rounded-lg h-auto w-48" 
                    src={movie.poster} 
                    alt={movie.title}
                    onError={() => setImageError(true)}
                />
            ) : (
                <div className="w-48 h-72 border rounded-md flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-600">No Image</span>
                </div>
            )}
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h3 className="mb-2 text-2xl font-bold tracking-tight text-heading">{movie.title}</h3>
                <p className="mb-2 text-body">{movie.plot}</p>
                <p>Released: {movie.year}</p>
            </div>
        </div>
    );
}

const LoadingMovies = () => {
    const dummyMovies: Movie[] = Array.from({ length: MOVIES_PER_PAGE }, (_, index) => ({
        title: `Loading Title ${index + 1}`,
        year: 0,
        poster: '',
        plot: 'Loading plot...'
    }));

    return (
        <div className="flex flex-col gap-4">
            {dummyMovies.map((movie: Movie, index: number) => {
                return <MovieCard key={index} movie={movie} />
            })}
        </div>
    );
}

const MongoDbExample = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);
    const [movies, setMovies] = React.useState<Movie[]>();
    const [pageNumber, setPageNumber] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(0);

    async function handleGetMovies(currentPageNumber: number = 1) {
        setLoading(true);
        const movies = await getMoviesPaged(MOVIES_PER_PAGE, currentPageNumber);
        if (movies) {
            setMovies(movies);
            setError(null);
        } else {
            setError("Failed to fetch movies from MongoDB.");
        }
        setLoading(false);
    };
    
    async function calculateTotalPages() {
        const movieCount = await getMovieCount();
        if (movieCount !== null) {
            setTotalPages(Math.ceil(movieCount / MOVIES_PER_PAGE));
        } else {
            setError("Failed to fetch movie count.");
        }
    }

    useEffect(() => {
        handleGetMovies();
        calculateTotalPages();
    }, []);

    function previousPage() {
        if (totalPages > 0 && pageNumber > 1) {
            const newPageNumber = pageNumber - 1;
            setPageNumber(newPageNumber);
            handleGetMovies(newPageNumber);
        }
    }

    function nextPage() {
        if (totalPages > 0 && pageNumber < totalPages) {
            const newPageNumber = pageNumber + 1;
            setPageNumber(newPageNumber);
            handleGetMovies(newPageNumber);
        }
    }

    return (
        <Project name="MongoDB Example" description="This uses the MonboDB Atlas integration from Vercel to read and display data from MongoDB">
            <div className="flex flex-col">
                <div className="flex flex-row gap-3">
                    <button onClick={previousPage} disabled={loading}>Previous</button>
                    <p>{pageNumber} / {totalPages > 0 ? totalPages : 1}</p>
                    <button onClick={nextPage} disabled={loading}>Next</button>
                </div>
                <div className="flex flex-col gap-4">
                {loading && !error && <LoadingMovies />}
                {!loading && error && <p className="text-red-500">{error}</p>}
                {!loading && !error && movies && 
                    movies.map((movie: Movie, index: number) => {
                        return <MovieCard key={index} movie={movie} />
                    })}
                </div>
            </div>
        </Project>
    );
}

export default MongoDbExample;