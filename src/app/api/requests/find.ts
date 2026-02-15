"use server";
import db from "@/lib/mongodb";
import { Collection, Sort } from "mongodb";

export async function getCollectionCount(dbName: string, collectionName: string): Promise<number> {
  try {
    const database = await db.getDb(dbName);
    let collectionCount = await database.collection(collectionName).estimatedDocumentCount({});
    return collectionCount;
  } catch (e) {
    console.error(`Failed to fetch collection count for ${collectionName}: `, e);
    return 0;
  }
}

export async function getDocuments(dbName: string, collectionName: string, limit: number, pageNumber: number, query: object = {}, projectFields: object = {}, sortFields: Sort = {}): Promise<object[]> {
    try {
        const database = await db.getDb(dbName);
        let collection: Collection = database.collection(collectionName);
        let documents: object[] = await collection.find(query).sort(sortFields).project(projectFields).limit(limit).skip((pageNumber-1)*limit).toArray();
        return documents;
    } catch (e) {
        console.error(`Failed to fetch documents from ${collectionName}: `, e);
        return [];
    }
}