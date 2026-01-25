'use client';
import Project from "@/app/components/Project";
import React from "react";
import { testDatabaseConnection } from "@/app/api/requests/testconnection";
import { Movie, getAllMovies, getLimitedMovies } from "@/app/api/requests/find";

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
                <div className="w-48 h-72 border rounded-lg flex items-center justify-center flex-shrink-0">
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

const MongoDbExample = () => {
    const [response, setResponse] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);
    const [movies, setMovies] = React.useState<Movie[]>([]);

    async function handleTestConnection() {
        setLoading(true);
        setResponse("Awaiting connection to MongoDB...");
        const isConnected = await testDatabaseConnection();
            if (isConnected) {
                setResponse("Connected to MongoDB successfully!");
            } else {
                setResponse("Failed to connect to MongoDB.");
            }
        setLoading(false);
    };

    async function handleGetMovies() {
        setLoading(true);
        setResponse("Fetching movies from MongoDB...");
        const movies = await getLimitedMovies(5);
        if (movies) {
            setResponse(`Fetched ${movies.length} movies from MongoDB.`);
            setMovies(movies);
        } else {
            setResponse("Failed to fetch movies from MongoDB.");
        }
        setLoading(false);
    };

    return (
        <Project name="MongoDB Example" description="This uses the MonboDB Atlas integration from Vercel to read and display data from MongoDB">
            <div className="flex flex-col">
                <button onClick={handleTestConnection} disabled={loading}>Test Connection</button>
                <button onClick={handleGetMovies} disabled={loading}>Get Movies</button>
                <p>{response}</p>
                <div className="flex flex-col gap-4">
                {movies && movies.map((movie: Movie, index: number) => {
                    return <MovieCard key={index} movie={movie} />
                })}
                </div>
            </div>
        </Project>
    );
}

export default MongoDbExample;