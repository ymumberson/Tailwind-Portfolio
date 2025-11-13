import { useEffect, useState } from "react";
import { useGame } from "./gameContext";
import { getCookie, setCookie } from "./cookieReader";
import Loading from "./loadingIndicator";

const SAVE_DATA_COOKIE_UPGRADES = "IdleGameCookieUpgrades";

interface IUpgrade {
    name: string;
    cost: number;
    clickIncrement: number;
    idleIncrement: number;
    numberOwned: number;
}

const CalculateUpgradeCost = (upgrade: IUpgrade) => {
    const COST_MULTIPLIER = 1.5;
    return Math.ceil(upgrade.cost * COST_MULTIPLIER**upgrade.numberOwned);
}

const Upgrade: React.FC<{upgrade: IUpgrade, onBuy: () => void}> = ({upgrade, onBuy}) => {
    return (
        <button onClick={onBuy} className="px-1 border rounded-lg">
            {upgrade.name} | Cost: {CalculateUpgradeCost(upgrade)} | Increment: {upgrade.idleIncrement} | Count: {upgrade.numberOwned}
        </button>
    );
}

const Shop = () => {
    const { balance, setBalance, idleIncrement, setIdleIncrement, clickIncrement, setClickIncrement, incrementBalance} = useGame();
    
    const [savedUpgrades, setSavedUpgrades] = useState<IUpgrade[]>([]);
    const [upgrades, setUpgrades] = useState<IUpgrade[]>([
        {
            name: "Fruit Picker",
            cost: 10,
            clickIncrement: 0.1,
            idleIncrement: 0,
            numberOwned: 0
        },
        {
            name: "Apple",
            cost: 10,
            clickIncrement: 0,
            idleIncrement: 0.1,
            numberOwned: 0
        },
        {
            name: "Banana",
            cost: 100,
            clickIncrement: 0,
            idleIncrement: 1.5,
            numberOwned: 0
        },
        {
            name: "Cherry",
            cost: 1000,
            clickIncrement: 0,
            idleIncrement: 25,
            numberOwned: 0
        },
        {
            name: "Dragon Fruit",
            cost: 10000,
            clickIncrement: 0,
            idleIncrement: 400,
            numberOwned: 0
        },
    ]);

    useEffect(() => {
            if (savedUpgrades.length === 0) {
                async function fetchCookies() {
                    const cookiesFetch = await getCookie(SAVE_DATA_COOKIE_UPGRADES);
                    const parsedJson = cookiesFetch ? JSON.parse(cookiesFetch) : [];
                    setSavedUpgrades(parsedJson);
                    
                    let loadedUpgrades = upgrades.slice();
                    let loadedClickIncrement = 0;
                    let loadedIdleIncrement = 0;
                    parsedJson.forEach((upgrade: IUpgrade) => {
                        let loadedUpgrade = loadedUpgrades.find(elem => elem.name === upgrade.name);
                        if (loadedUpgrade) {
                            loadedUpgrade.numberOwned = upgrade.numberOwned;
                            loadedClickIncrement += upgrade.numberOwned * upgrade.clickIncrement;
                            loadedIdleIncrement += upgrade.numberOwned * upgrade.idleIncrement;
                        }
                    })
                    
                    setClickIncrement((currentClickIncrement: number) => currentClickIncrement + loadedClickIncrement);
                    setIdleIncrement((currentIdleIncrement: number) => currentIdleIncrement + loadedIdleIncrement);

                    setUpgrades(loadedUpgrades);
                    setSavedUpgrades(loadedUpgrades);
                }
                fetchCookies();
            } else {
                async function setCookies() {
                    await setCookie(SAVE_DATA_COOKIE_UPGRADES, JSON.stringify(upgrades));
                }
                setCookies();
            }
        }, [upgrades]);

    const buyUpgrade = (index: number) => {
        let newUpgrades = upgrades.slice();
        let upgrade = newUpgrades[index];
        let cost = CalculateUpgradeCost(upgrade);
        if (balance >= cost) {
            setBalance((currentBalance: number) => currentBalance - cost);
            setClickIncrement((currentClickIncrement: number) => currentClickIncrement + upgrade.clickIncrement);
            setIdleIncrement((currentIdleIncrement: number) => currentIdleIncrement + upgrade.idleIncrement);
            upgrade.numberOwned += 1;
        }
        setUpgrades(newUpgrades);
    };

    return (
        <div>
            <p>Shop</p>
            {(savedUpgrades.length === 0) && <Loading />}
            {(savedUpgrades.length > 0) &&
            <div className="flex flex-col">
                {upgrades.map((upgrade, index) => <Upgrade key={index} upgrade={upgrade} onBuy={() => buyUpgrade(index)}/>)}
            </div>}
        </div>
    )
}

export default Shop;