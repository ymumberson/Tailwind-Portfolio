"use server";
import db from "@/lib/mongodb";

// Hardcoded database and collection for security
const ALLOWED_DB = "sample_mflix";
const ALLOWED_COLLECTION = "movies";
const MAX_LIMIT = 100; // Maximum number of documents that can be fetched at once

export async function getMoviesCollectionCount(): Promise<number | null> {
  try {
    const database = await db.getDb(ALLOWED_DB);
    let collectionCount = await database.collection(ALLOWED_COLLECTION).estimatedDocumentCount({});
    return collectionCount;
  } catch (e) {
    console.error(`Failed to fetch collection count for ${ALLOWED_COLLECTION}: `, e);
    return null;
  }
}

export async function getMoviesPaged(limit: number, pageNumber: number): Promise<object[] | null> {
    try {
        // Validate and sanitize inputs
        const sanitizedLimit = Math.min(Math.max(1, Math.floor(limit)), MAX_LIMIT);
        const sanitizedPageNumber = Math.max(1, Math.floor(pageNumber));
        
        const database = await db.getDb(ALLOWED_DB);
        const collection = database.collection(ALLOWED_COLLECTION);
        
        // Use a fixed projection to only return necessary fields
        const documents: object[] = await collection
            .find({})
            .project({ _id: 0, title: 1, year: 1, poster: 1, plot: 1 })
            .limit(sanitizedLimit)
            .skip((sanitizedPageNumber - 1) * sanitizedLimit)
            .toArray();
        
        return documents;
    } catch (e) {
        console.error(`Failed to fetch documents from ${ALLOWED_COLLECTION}: `, e);
        return null;
    }
}