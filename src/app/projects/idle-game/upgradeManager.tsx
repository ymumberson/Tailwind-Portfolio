import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DEFAULT_UPGRADES, IUpgrade } from "./upgrades";
import { getCookie, setCookie } from "./cookieReader";
import { useGame } from "./gameContext";

const SAVE_DATA_COOKIE_UPGRADES = "IdleGameCookieUpgrades";

export const CalculateUpgradeCost = (upgrade: IUpgrade) => {
    const COST_MULTIPLIER = 1.5;
    return Math.ceil(upgrade.cost * COST_MULTIPLIER**upgrade.numberOwned);
}

async function loadUpgrades(setClickIncrement: Dispatch<SetStateAction<number>>, setUpgrades: Dispatch<SetStateAction<IUpgrade[]>>) {
    const cookiesFetch = await getCookie(SAVE_DATA_COOKIE_UPGRADES);
    const parsedJson = cookiesFetch ? JSON.parse(cookiesFetch) : [];
    
    let loadedUpgrades = DEFAULT_UPGRADES;
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

    setUpgrades(loadedUpgrades);
}

async function saveUpgrades(upgrades: IUpgrade[]) {
    await setCookie(SAVE_DATA_COOKIE_UPGRADES, JSON.stringify(upgrades));
}

export const UpgradeManager = () => {
    const { setClickIncrement, upgrades, setUpgrades} = useGame();
    
    useEffect(() => {
        if (upgrades.length === 0) {
            loadUpgrades(setClickIncrement, setUpgrades);
        } else {
            saveUpgrades(upgrades);
        }
    }, [upgrades]);

    return null;
}

