'use client';  // This marks the component as a Client Component

import Project from "@/app/components/Project";
import React from "react";
import useSWR from "swr";
import { IconSunrise, IconSunset, IconWind, IconCloud, IconDroplet, IconSnowflake } from "@tabler/icons-react";
import { CartesianGrid, Legend, Line, LineChart, ReferenceLine, Tooltip, XAxis, YAxis } from "recharts";

const fetchData = async () => {
    const lat = "52.1951";
    const lon = "0.1313";
    const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`);
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

const HourlyForecast = (hourly: any) => {
    hourly = hourly.hourly;
    
    const chartData = [];
    for (let i=0; i<hourly.length; ++i) {
        chartData.push({
            name: new Date(hourly[i].dt * 1000).getHours(),
            temp: Math.floor(KelvinToCelsius(hourly[i].temp)),
            feels_like: Math.floor(KelvinToCelsius(hourly[i].feels_like))
        });
    }

    return (
        <div>
            <LineChart width={600} height={250} data={chartData}>
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <ReferenceLine y={0} strokeDasharray="3 3"/>
                <Line type="monotone" dataKey="temp" stroke="#8884d8" />
                <Line type="monotone" dataKey="feels_like" stroke="#82ca9d" />
            </LineChart>
            {/* <pre>{JSON.stringify(hourly, null, 2)}</pre> */}
        </div>
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

const CurrentWeather = (current: any) => {
    current = current.current;

    return (
        <div className="flex flex-col items-center">
            <img className="rounded-xl" src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}></img>
            <div className="">
                <h1 className="mb-0 text-3xl font-bold text-gray-900 dark:text-white">Cambridge District</h1>
                <p>{current.weather[0].main}: {current.weather[0].description}</p>
                <p className="">{Math.floor(KelvinToCelsius(current.temp))}&#8451; ({Math.floor(KelvinToCelsius(current.feels_like))}&#8451;)</p>
                <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded-sm md:my-4 dark:bg-gray-700"/>
                <div className="grid grid-cols-2">
                    <WeatherBadge weatherIcon={IconSunrise} text={new Date(current.sunrise * 1000).toLocaleTimeString()}/>
                    <WeatherBadge weatherIcon={IconSunset} text={new Date(current.sunset * 1000).toLocaleTimeString()}/>
                    <WeatherBadge weatherIcon={IconWind} text={current.wind_speed + "m/s"}/>
                    <WeatherBadge weatherIcon={IconCloud} text={current.clouds}/>
                    <WeatherBadge weatherIcon={IconDroplet} text={current.rain ? current.rain["1h"] : "N/A"}/>
                    <WeatherBadge weatherIcon={IconSnowflake} text={current.snow ? current.snow["1h"] : "N/A"}/>
                </div>
            </div>
            {/* <pre>{JSON.stringify(current, null, 2)}</pre> */}
        </div>
    );
}

const Weather = (data: any) => {
    return (
        <div>
            <CurrentWeather current={data.data.current}/>
            <HourlyForecast hourly={data.data.hourly}/>
            {/* <pre>{JSON.stringify(data.data, null, 2)}</pre> */}
        </div>
    )
}

const KelvinToCelsius = (kelvin: number) => {
    return kelvin - 273.15;
}

const WeatherPage = () => {
    const { data, error } = useSWR('dataKey', fetchData);

    return (
        <Project name="Weather" description="Fetching current weather data from https://openweathermap.org/ and displaying it.">
            {error && <ErrorMsg error={error} />}
            {!error && !data && <Loading />}
            {!error && data && <Weather data={data}/>}
        </Project>
    );
}

export default WeatherPage;