"use server";
import db from "@/lib/mongodb";

export async function testDatabaseConnection(dbName: string) {
  try {
    // Get the database instance
    const database = await db.getDb(dbName);
    // Send a ping to confirm a successful connection
    await database.admin().ping();
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
    return true;
  } catch (e) {
    console.error("Database connection failed:", e);
    return false;
  }
}
