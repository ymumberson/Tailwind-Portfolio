import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getCookie, setCookie } from "./cookieReader";

const SAVE_DATA_COOKIE_BALANCE = "IdleGameCookieBalance";

interface IGameContext {
    balance: number;
    setBalance: React.Dispatch<React.SetStateAction<number>>;
    clickIncrement: number;
    setClickIncrement: React.Dispatch<React.SetStateAction<number>>;
    idleIncrement: number;
    setIdleIncrement: React.Dispatch<React.SetStateAction<number>>;
    incrementBalance: (amount: number) => void;
}

const GameContext = createContext<IGameContext | null>(null);

export const GameProvider: React.FC<{children: React.ReactNode, className: string}> = ({children, className=""}) => {
    const [balance, setBalance] = useState(-1);
    const [clickIncrement, setClickIncrement] = useState(1);
    const [idleIncrement, setIdleIncrement] = useState(0);

    const idleAmountRef = useRef(idleIncrement);
    useEffect(() => {
        idleAmountRef.current = idleIncrement;
    }, [idleIncrement])


    useEffect(() => {
        if (balance === -1) {
            async function fetchCookies() {
                const cookiesFetch = await getCookie(SAVE_DATA_COOKIE_BALANCE);
                setBalance(+cookiesFetch);
            }
            fetchCookies();
        } else {
            async function setCookies() {
                await setCookie(SAVE_DATA_COOKIE_BALANCE, balance.toString());
            }
            setCookies();
        }
    }, [balance]);

    async function incrementBalance(amount: number) { //TODO: Account for race conditions?
        setBalance(oldValue => {return oldValue+amount});
    }

    useEffect(() => {
        var passivGenerator = setInterval(function(){
            incrementBalance(idleAmountRef.current);
        }, 1000);

        return () => clearInterval(passivGenerator);
    }, []);

    return (
        <GameContext.Provider
            value={{ balance, setBalance, clickIncrement, setClickIncrement, idleIncrement, setIdleIncrement, incrementBalance }}
        >
            <div className={className}>{children}</div>
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const ctx = useContext(GameContext);
    if (!ctx) throw new Error("useGame must be used within a GameProvider");
    return ctx;
};