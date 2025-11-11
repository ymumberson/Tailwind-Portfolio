'use client';  // This marks the component as a Client Component

import Project from "@/app/components/Project";
import { getCookie, setCookie } from "./cookieReader";
import { useEffect, useState } from "react";

const SAVE_DATA_COOKIE = "IdleGameSaveData";

const idleGame = () => {
    const [cookies, setCookies] = useState(-1);
    const [counter, setCounter] = useState(0);

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

    async function btnClick() {
        setCounter(counter+1);
        setCookies(cookies+1);
    }
    
    return (
        <Project name={"Idle Game"} description={"This is a small project to learn about cookies."} >
            <div>Total: {cookies}</div>
            <div>This session: {counter}</div>
            <button onClick={btnClick}>Click</button>
        </Project>
    );
}

export default idleGame;