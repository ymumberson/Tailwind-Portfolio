'use client';
import Project from "@/app/components/Project";
import React from "react";
import { testDatabaseConnection } from "@/app/api/requests/testconnection";

const MongoDbExample = () => {
    const [response, setResponse] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);

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

    return (
        <Project name="MongoDB Example" description="This uses the MonboDB Atlas integration from Vercel to read and display data from MongoDB">
            <button onClick={handleTestConnection} disabled={loading}>Test Connection</button>
            <p>{response}</p>
        </Project>
    );
}

export default MongoDbExample;