import { RefObject, useEffect, useState } from "react";
import { useGame } from "./gameContext";
import { getCookie, setCookie } from "./cookieReader";
import Loading from "./loadingIndicator";
import { calculateUpgradeCost } from "./upgradeManager";
import { IUpgrade } from "./upgrades";

const Upgrade: React.FC<{upgrade: IUpgrade, onBuy: () => void, upgradeTimers: Record<string, number>}> = ({upgrade, onBuy, upgradeTimers}) => {
    return (
        <button
            onClick={onBuy}
            className="px-1 border-2 text-gray-900 hover:text-white border-gray-800 hover:bg-gray-900 focus-ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 active:opacity-90"
        >
            {upgrade.name} | Cost: {calculateUpgradeCost(upgrade)} | Increment: {upgrade.idleIncrement} | Count: {upgrade.numberOwned}
            <div className="max-w-sm bg-gray-300 rounded-full h-2">
                <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${upgradeTimers[upgrade.name] != undefined ? upgradeTimers[upgrade.name] : 0}%` }}
                ></div>
            </div>
        </button>
    );
}

const Shop = ({ className="" }) => {
    const { balance, setBalance, idleIncrement, setIdleIncrement, clickIncrement, setClickIncrement, incrementBalance, upgrades, setUpgrades, upgradeTimers } = useGame();

    const buyUpgrade = (index: number) => {
        let newUpgrades = upgrades.slice();
        let upgrade = newUpgrades[index];
        let cost = calculateUpgradeCost(upgrade);
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
                {upgrades.map((upgrade, index) => <Upgrade key={index} upgrade={upgrade} onBuy={() => buyUpgrade(index)} upgradeTimers={upgradeTimers}/>)}
            </div>}
        </div>
    )
}

export default Shop;