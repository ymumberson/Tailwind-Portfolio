'use client';  // This marks the component as a Client Component

import Project from "@/app/components/Project";
import React from "react";
import useSWR from "swr";

const fetchData = async () => {
    const lat = "52.1951";
    const lon = "0.1313";
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`);
    if (!response.ok) {
        throw new Error('Network response was not okay');
    }
    return response.json();
}

const ApiFetching = () => {
    const { data, error } = useSWR('dataKey', fetchData);

    return (
        <Project name="API Fetching" description="Fetching various bits of data from different APIs.">
            {error && <p>{error.message}</p>}
            {!error && !data && <p>Loading!</p>}
            {!error && data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </Project>
    );
}

export default ApiFetching;