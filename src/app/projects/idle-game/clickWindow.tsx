import { useGame } from "./gameContext";
import Loading from "./loadingIndicator";

const ClickWindow = () => {
    const { balance, setBalance, idleIncrement, setIdleIncrement, clickIncrement, setClickIncrement, incrementBalance} = useGame();

    return (
        <div>
            {balance === -1 && <Loading/>}
            {balance != -1 &&
                <div>
                    <div>Currency: {balance}</div>
                    <div>Idle Amount: {idleIncrement}</div>
                    <div>Click Amount: {clickIncrement}</div>
                    <button onClick={() => incrementBalance(clickIncrement)} className="px-1 border rounded-lg">Click</button>
                    <button onClick={() => setClickIncrement(old => {return old+0.1;})} className="px-1 border rounded-lg">Increment Click</button>
                    <button onClick={() => setIdleIncrement(old => {return old+0.01;})} className="px-1 border rounded-lg">Increment Idle</button>
                    <button onClick={() => setBalance(0)} className="px-1 border rounded-lg">Reset</button>
                </div>
            }
        </div>
    );
}

export default ClickWindow;