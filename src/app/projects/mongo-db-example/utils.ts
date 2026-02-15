"use client";
import { getMoviesCollectionCount, getMoviesPaged } from "@/app/api/requests/find";

export interface Movie {
    _id?: string;
    title: string;
    year: number;
    poster: string;
    plot: string;
};

export async function getMovieCount(): Promise<number | null> {
    try {
        return await getMoviesCollectionCount();
    } catch (e) {
        console.error("Failed to fetch movie count: ", e);
        return null;
    }
}

export async function fetchMoviesPaged(limit: number, pageNumber: number): Promise<Movie[] | null> {
    try {
        return await getMoviesPaged(limit, pageNumber) as Movie[];
    } catch (e) {
        console.error("Failed to fetch movies: ", e);
        return null;
    }
}