"use client";
import { getMoviesCollectionCount, getMoviesPaged as getMoviesPagedFromDb } from "@/app/api/requests/find";

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

export async function getMoviesPaged(limit: number, pageNumber: number): Promise<Movie[] | null> {
    try {
        return await getMoviesPagedFromDb(limit, pageNumber) as Movie[];
    } catch (e) {
        console.error("Failed to fetch movies: ", e);
        return null;
    }
}