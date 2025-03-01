'use client';  // This marks the component as a Client Component

import Project from "@/app/components/Project";
import React from "react";
import useSWR from "swr";

const fetchData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    if (!response.ok) {
        throw new Error('Network response was not okay');
    }
    return response.json();
}

const ApiFetching = () => {
    const {data,error} = useSWR('dataKey', fetchData);

    return (
        <Project name="API Fetching" description="Fetching various bits of data from different APIs.">
            {!data && <p>Loading!</p>}
            {error && <p>{error.message}</p>}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </Project>
    );
}

export default ApiFetching;