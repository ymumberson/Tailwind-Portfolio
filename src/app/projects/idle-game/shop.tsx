import { useEffect, useState } from "react";
import { useGame } from "./gameContext";
import { getCookie, setCookie } from "./cookieReader";
import Loading from "./loadingIndicator";
import { CalculateUpgradeCost } from "./upgradeManager";
import { IUpgrade } from "./upgrades";

const Upgrade: React.FC<{upgrade: IUpgrade, onBuy: () => void}> = ({upgrade, onBuy}) => {
    // const { incrementBalance } = useGame();

    // const [timer, setTimer] = useState(0);
    // useEffect(() => {
    //         if (upgrade.numberOwned > 0) {
    //             var timerInterval = setInterval(function(){
    //                 setTimer(oldTime => {
    //                     if (oldTime >= 100) {
    //                         incrementBalance(upgrade.idleIncrement * upgrade.numberOwned);
    //                         return 0;
    //                     }
    //                     return oldTime + (1 / upgrade.idleCompletionDuration);
    //                 })
    //             }, 10);
        
    //             return () => clearInterval(timerInterval);
    //         }
    // }, []);

    return (
        <button
            onClick={onBuy}
            className="px-1 border-2 text-gray-900 hover:text-white border-gray-800 hover:bg-gray-900 focus-ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 active:opacity-90"
        >
            {upgrade.name} | Cost: {CalculateUpgradeCost(upgrade)} | Increment: {upgrade.idleIncrement} | Count: {upgrade.numberOwned}
            <div className="max-w-sm bg-gray-300 rounded-full h-2">
                <div
                className="bg-blue-500 h-2 rounded-full"
                // style={{ width: `${timer}%` }}
                ></div>
            </div>
        </button>
    );
}

const Shop = ({ className="" }) => {
    const { balance, setBalance, idleIncrement, setIdleIncrement, clickIncrement, setClickIncrement, incrementBalance, upgrades, setUpgrades } = useGame();

    const buyUpgrade = (index: number) => {
        let newUpgrades = upgrades.slice();
        let upgrade = newUpgrades[index];
        let cost = CalculateUpgradeCost(upgrade);
        if (balance >= cost) {
            setBalance((currentBalance: number) => currentBalance - cost);
            setClickIncrement((currentClickIncrement: number) => currentClickIncrement + upgrade.clickIncrement);
            upgrade.numberOwned += 1;
        }
        setUpgrades(newUpgrades);
    };

    return (
        <div className={className}>
            <p>Shop</p>
            {(upgrades.length === 0) && <Loading />}
            {(upgrades.length > 0) &&
            <div className="flex flex-col">
                {upgrades.map((upgrade, index) => <Upgrade key={index} upgrade={upgrade} onBuy={() => buyUpgrade(index)}/>)}
            </div>}
        </div>
    )
}

export default Shop;