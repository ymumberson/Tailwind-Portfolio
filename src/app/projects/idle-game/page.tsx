'use client';  // This marks the component as a Client Component

import Project from "@/app/components/Project";
import { getCookie, setCookie } from "./cookieReader";
import { useEffect, useRef, useState } from "react";

const SAVE_DATA_COOKIE_CURRENCY = "IdleGameCookieCurrency";

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
    const [currency, setCurrency] = useState(-1);
    const [clickAmount, setClickAmount] = useState(1);
    const [idleAmount, setIdleAmount] = useState(1);

    const idleAmountRef = useRef(idleAmount);
    useEffect(() => {
        idleAmountRef.current = idleAmount;
    }, [idleAmount])


    useEffect(() => {
        if (currency === -1) {
            async function fetchCookies() {
                const cookiesFetch = await getCookie(SAVE_DATA_COOKIE_CURRENCY);
                setCurrency(+cookiesFetch);
            }
            fetchCookies();
        } else {
            async function setCookies() {
                await setCookie(SAVE_DATA_COOKIE_CURRENCY, currency.toString());
            }
            setCookies();
        }
    }, [currency]);

    async function incrementCounter(amount: number) { //TODO: Account for race conditions?
        setCurrency(oldValue => {return oldValue+amount});
    }

    useEffect(() => {
        var passivGenerator = setInterval(function(){
            incrementCounter(idleAmountRef.current);
        }, 1000);

        return () => clearInterval(passivGenerator);
    }, []);

    return (
        <Project name={"Idle Game"} description={"This is a small project to learn about cookies."} >
            {currency === -1 && <Loading/>}
            {currency != -1 &&
                <div>
                    <div>Currency: {currency}</div>
                    <div>Idle Amount: {idleAmount}</div>
                    <div>Click Amount: {clickAmount}</div>
                    <button onClick={() => incrementCounter(clickAmount)}>Click</button>
                    <button onClick={() => setIdleAmount(old => {return old+1;})}>Increment Idle</button>
                </div>
            }
        </Project>
    );
}

export default idleGame;