import { useState } from "react";
import { useGame } from "./gameContext";

interface IUpgrade {
    name: string;
    cost: number;
    clickIncrement: number;
    idleIncrement: number;
    numberOwned: number;
}

const Upgrade: React.FC<{upgrade: IUpgrade, onBuy: () => void}> = ({upgrade, onBuy}) => {
    return (
        <button onClick={onBuy} className="px-1 border rounded-lg">
            {upgrade.name} | {upgrade.cost} | {upgrade.idleIncrement} | {upgrade.numberOwned}
        </button>
    );
}

const Shop = () => {
    const { balance, setBalance, idleIncrement, setIdleIncrement, clickIncrement, setClickIncrement, incrementBalance} = useGame();
    
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
            idleIncrement: 1,
            numberOwned: 0
        },
        {
            name: "Cherry",
            cost: 1000,
            clickIncrement: 0,
            idleIncrement: 10,
            numberOwned: 0
        },
        {
            name: "Dragon Fruit",
            cost: 10000,
            clickIncrement: 0,
            idleIncrement: 100,
            numberOwned: 0
        },
    ]);

    const buyUpgrade = (index: number) => {
        let newUpgrades = upgrades.slice();
        let upgrade = newUpgrades[index];
        if (balance >= upgrade.cost) {
            setBalance((currentBalance: number) => currentBalance - upgrade.cost);
            setClickIncrement((currentClickIncrement: number) => currentClickIncrement + upgrade.clickIncrement);
            setIdleIncrement((currentIdleIncrement: number) => currentIdleIncrement + upgrade.idleIncrement);
            upgrade.numberOwned += 1;
        }
        setUpgrades(newUpgrades);
    };

    return (
        <div>
            <p>Shop</p>
            <div className="flex flex-col">
                {upgrades.map((upgrade, index) => <Upgrade key={index} upgrade={upgrade} onBuy={() => buyUpgrade(index)}/>)}
            </div>
        </div>
    )
}

export default Shop;