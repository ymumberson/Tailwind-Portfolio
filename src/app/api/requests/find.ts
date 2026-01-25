"use server";
import db from "@/lib/mongodb";
import { Collection } from "mongodb";

export interface Movie {
    title: string;
    year: number;
    poster: string;
    plot: string;
};

export async function getAllMovies() {
  try {
    // Get the database instance
    const database = await db.getDb();
    // Send a ping to confirm a successful connection

    let movies = await database.collection('movies').estimatedDocumentCount({});
    return movies;
  } catch (e) {
    console.error("Failed to fetch all movies: ", e);
    return null;
  }
}

export async function getLimitedMovies(limit: number): Promise<Movie[] | null> {
    try {
        const database = await db.getDb();
        const query = {};
        const projectFields = { _id: 0, title: 1, year: 1, poster: 1, plot: 1 };
        let moviesCollection: Collection = database.collection('movies');
        let movies: Movie[] = await moviesCollection.find(query).project(projectFields).limit(limit).toArray() as Movie[];
        return movies;
    } catch (e) {
        console.error("Failed to fetch movies: ", e);
        return [];
    }
}