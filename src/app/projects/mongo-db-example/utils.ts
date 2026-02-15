"use client";
import { getCollectionCount, getDocuments } from "@/app/api/requests/find";
const DB_NAME = "sample_mflix";

export interface Movie {
    title: string;
    year: number;
    poster: string;
    plot: string;
};

export async function getMovieCount(): Promise<number | null> {
    return await getCollectionCount(DB_NAME, 'movies');
}

export async function getMoviesPaged(limit: number, pageNumber: number): Promise<Movie[]> {
    try {
         return await getDocuments(DB_NAME, 'movies', limit, pageNumber, {}, { _id: 0, title: 1, year: 1, poster: 1, plot: 1 }, {}) as Movie[];
    } catch (e) {
        console.error("Failed to fetch movies: ", e);
        return [];
    }
}