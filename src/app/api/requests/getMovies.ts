"use server";
import db from "@/lib/mongodb";

// Hardcoded database and collection for security
const MOVIES_DB = "sample_mflix";
const MOVIES_COLLECTION = "movies";
const MAX_LIMIT = 100; // Maximum number of documents that can be fetched at once

export interface Movie {
    _id?: string;
    title: string;
    year: number;
    poster: string;
    plot: string;
};

export async function getMoviesCount(): Promise<number | null> {
  try {
    const database = await db.getDb(MOVIES_DB);
    let collectionCount = await database.collection(MOVIES_COLLECTION).estimatedDocumentCount({});
    return collectionCount;
  } catch (e) {
    console.error(`Failed to fetch collection count for ${MOVIES_COLLECTION}: `, e);
    return null;
  }
}

export async function getMoviesPaged(limit: number, pageNumber: number): Promise<Movie[] | null> {
    try {
        // Validate inputs are numbers
        if (typeof limit !== 'number' || typeof pageNumber !== 'number' || !isFinite(limit) || !isFinite(pageNumber)) {
            console.error('Invalid input: limit and pageNumber must be finite numbers');
            return null;
        }
        
        // Validate and sanitize inputs
        const sanitizedLimit = Math.min(Math.max(1, Math.floor(Math.abs(limit))), MAX_LIMIT);
        const sanitizedPageNumber = Math.max(1, Math.floor(Math.abs(pageNumber)));
        
        // Log warnings if inputs were modified
        if (sanitizedLimit !== limit) {
            console.warn(`Limit was sanitized. Maximum allowed limit is ${MAX_LIMIT}.`);
        }
        if (sanitizedPageNumber !== pageNumber) {
            console.warn(`Page number was sanitized. Minimum page number is 1.`);
        }
        
        const database = await db.getDb(MOVIES_DB);
        const collection = database.collection(MOVIES_COLLECTION);
        
        // Use a fixed projection to only return necessary fields
        const documents: object[] = await collection
            .find({})
            .project({ _id: 0, title: 1, year: 1, poster: 1, plot: 1 })
            .limit(sanitizedLimit)
            .skip((sanitizedPageNumber - 1) * sanitizedLimit)
            .toArray();
        
        return documents as Movie[];
    } catch (e) {
        console.error(`Failed to fetch documents from ${MOVIES_COLLECTION}: `, e);
        return null;
    }
}