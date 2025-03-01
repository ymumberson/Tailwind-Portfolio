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

const Loading = () => {
    return (
        <div role="status" className="max-w-sm animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[275px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[250px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[380px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            <span className="sr-only">Loading...</span>
        </div>
    );
}

const ErrorMsg = ( error: any ) => {
    return (
        <p>{error.message}</p>
    );
}

const Weather = (obj: any) => {
    const KelvinToCelsius = (kelvin: number) => {
        return kelvin - 273.15;
    }

    return (
        <div className="">
            <div className="flex flex-row items-center">
                <h1 className="mb-0 text-3xl font-bold text-gray-900 dark:text-white">{obj.data.name}</h1>
                <img src={`https://openweathermap.org/img/wn/${obj.data.weather[0].icon}@2x.png`}></img>
            </div>
            <p>{Math.floor(KelvinToCelsius(obj.data.main.temp))}&#8451; ({Math.floor(KelvinToCelsius(obj.data.main.feels_like))}&#8451;)</p>
            <p>{obj.data.weather[0].main}: {obj.data.weather[0].description}</p>
        </div>
    );
}

const ApiFetching = () => {
    const { data, error } = useSWR('dataKey', fetchData);

    return (
        <Project name="API Fetching" description="Fetching various bits of data from different APIs.">
            {error && <ErrorMsg error={error} />}
            {!error && !data && <Loading />}
            {!error && data && <Weather data={data} />}
        </Project>
    );
}

export default ApiFetching;