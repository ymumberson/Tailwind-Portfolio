'use client';  // This marks the component as a Client Component

import Project from "@/app/components/Project";
import React from "react";
import useSWR from "swr";
import { IconSunrise, IconSunset, IconWind, IconCloud, IconDroplet, IconSnowflake } from "@tabler/icons-react";

const fetchData = async () => {
    const lat = "52.1951";
    const lon = "0.1313";
    // const lat = "35.9078";
    // const lon = "127.7669";
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

interface WeatherBadgeProps {
    weatherIcon: React.ComponentType<any>;
    text: string;
}
const WeatherBadge: React.FC<WeatherBadgeProps> = ({ weatherIcon: IconComponent, text }) => {
    return (
        <div className="flex flex-row gap-2 items-center">
            <IconComponent/>
            <span>{text}</span>
        </div>
    )
}

const Weather = (obj: any) => {
    const KelvinToCelsius = (kelvin: number) => {
        return kelvin - 273.15;
    }

    return (
        <div className="flex justify-center">
            <div className="mt-5">
                <h1 className="mb-0 text-3xl font-bold text-gray-900 dark:text-white">{obj.data.name}</h1>
                <p>{obj.data.weather[0].main}: {obj.data.weather[0].description}</p>
                <p className="">{Math.floor(KelvinToCelsius(obj.data.main.temp))}&#8451; ({Math.floor(KelvinToCelsius(obj.data.main.feels_like))}&#8451;)</p>
                <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded-sm md:my-4 dark:bg-gray-700"/>
                <div className="grid grid-cols-2">
                    <WeatherBadge weatherIcon={IconSunrise} text={new Date(obj.data.sys.sunrise * 1000).toLocaleTimeString()}/>
                    <WeatherBadge weatherIcon={IconSunset} text={new Date(obj.data.sys.sunset * 1000).toLocaleTimeString()}/>
                    <WeatherBadge weatherIcon={IconWind} text={obj.data.wind.speed + "m/s"}/>
                    <WeatherBadge weatherIcon={IconCloud} text={obj.data.clouds.all}/>
                    <WeatherBadge weatherIcon={IconDroplet} text={obj.data.rain ? obj.data.rain["1h"] : "N/A"}/>
                    <WeatherBadge weatherIcon={IconSnowflake} text={obj.data.snow ? obj.data.snow["1h"] : "N/A"}/>
                </div>
            </div>
            <div className="align-top items-baseline ml-10">
                <img className="rounded-xl" src={`https://openweathermap.org/img/wn/${obj.data.weather[0].icon}@2x.png`}></img>
            </div>
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