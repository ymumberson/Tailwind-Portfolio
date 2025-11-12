'use client';  // This marks the component as a Client Component

import Project from "@/app/components/Project";
import { getCookie, setCookie } from "./cookieReader";
import { useEffect, useState } from "react";

const SAVE_DATA_COOKIE = "IdleGameSaveData";

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

const idleGame = () => {
    const [cookies, setCookies] = useState(-1);


    useEffect(() => {
        if (cookies === -1) {
            async function fetchCookies() {
                const cookiesFetch = await getCookie(SAVE_DATA_COOKIE);
                setCookies(+cookiesFetch);
            }
            fetchCookies();
        } else {
            async function setCookies() {
                await setCookie(SAVE_DATA_COOKIE, cookies.toString());
            }
            setCookies();
        }
    }, [cookies]);

    async function incrementCounter(amount: number) { //TODO: Account for race conditions?
        setCookies(cookies+amount);
    }
    
    return (
        <Project name={"Idle Game"} description={"This is a small project to learn about cookies."} >
            {cookies === -1 && <Loading/>}
            {cookies != -1 &&
                <div>
                    <div>Total: {cookies}</div>
                    <button onClick={() => incrementCounter(1)}>Click</button>
                </div>
            }
        </Project>
    );
}

export default idleGame;