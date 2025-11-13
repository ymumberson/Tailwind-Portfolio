import { useEffect, useState } from "react";
import { useGame } from "./gameContext";
import Loading from "./loadingIndicator";

const ClickWindow = ({ className="" }) => {
    const { balance, setBalance, idleIncrement, setIdleIncrement, clickIncrement, setClickIncrement, incrementBalance} = useGame();

    const [timer, setTimer] = useState(0);

    useEffect(() => {
            var timerInterval = setInterval(function(){
                setTimer(oldTime => {
                    if (oldTime === 100) {
                        return 0;
                    }
                    return oldTime + 1;
                })
            }, 10);
    
            return () => clearInterval(timerInterval);
    }, []);

    return (
        <div className={className}>
            {balance === -1 && <Loading/>}
            {balance != -1 &&
                <div>
                    <div>Currency: {balance}</div>
                    <div>Idle Amount: {idleIncrement}</div>
                    <div>Click Amount: {clickIncrement}</div>
                    <button
                        onClick={() => incrementBalance(clickIncrement)}
                        className="p-10 border-2 text-gray-900 hover:text-white border-gray-800 hover:bg-gray-900 focus-ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 active:opacity-90"
                    >Click</button>
                    <div className="max-w-sm bg-gray-300 rounded-full h-2">
                        <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${timer}%` }}
                        ></div>
                    </div>
                </div>
            }
        </div>
    );
}

export default ClickWindow;