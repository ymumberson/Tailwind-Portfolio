import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { DEFAULT_UPGRADES, IUpgrade } from "./upgrades";
import { getCookie, setCookie } from "./cookieReader";
import { useGame } from "./gameContext";

const SAVE_DATA_COOKIE_UPGRADES = "IdleGameCookieUpgrades";

export const calculateUpgradeCost = (upgrade: IUpgrade) => {
    const COST_MULTIPLIER = 1.5;
    return Math.ceil(upgrade.cost * COST_MULTIPLIER**upgrade.numberOwned);
}

export const calculateUpgradeIdleGeneration = (upgrade: IUpgrade) => {
    return upgrade.numberOwned * upgrade.idleIncrement;
}

async function loadUpgrades(setClickIncrement: Dispatch<SetStateAction<number>>, setUpgrades: Dispatch<SetStateAction<IUpgrade[]>>, upgradeTimers: RefObject<Record<string, number>>) {
    const cookiesFetch = await getCookie(SAVE_DATA_COOKIE_UPGRADES);
    const parsedJson = cookiesFetch ? JSON.parse(cookiesFetch) : [];
    
    let loadedUpgrades = DEFAULT_UPGRADES;
    let loadedClickIncrement = 0;
    parsedJson.forEach((upgrade: IUpgrade) => {
        let loadedUpgrade = loadedUpgrades.find(elem => elem.name === upgrade.name);
        if (loadedUpgrade) {
            loadedUpgrade.numberOwned = upgrade.numberOwned;
            loadedClickIncrement += upgrade.numberOwned * upgrade.clickIncrement;
            upgradeTimers.current[upgrade.name] = 0;
        }
    })
    
    setClickIncrement((currentClickIncrement: number) => currentClickIncrement + loadedClickIncrement);

    setUpgrades(loadedUpgrades);
}

async function saveUpgrades(upgrades: IUpgrade[]) {
    await setCookie(SAVE_DATA_COOKIE_UPGRADES, JSON.stringify(upgrades));
}

export const UpgradeManager = () => {
    const { setClickIncrement, incrementBalance , upgrades, setUpgrades, upgradeTimers} = useGame();

    const upgradesRef = useRef<IUpgrade[]>([]);
    
    useEffect(() => {
        upgradesRef.current = upgrades;
        if (upgrades.length === 0) {
            loadUpgrades(setClickIncrement, setUpgrades, upgradeTimers);
        } else {
            saveUpgrades(upgrades);
        }
    }, [upgrades]);

    useEffect(() => {
        var timerInterval = setInterval(function(){
            upgradesRef.current.forEach((upgrade: IUpgrade) => {
                let timer = upgradeTimers.current[upgrade.name];
                if (timer != undefined && upgrade.numberOwned > 0) {
                    timer += (10.0 / upgrade.idleCompletionDuration);
                    if (timer >= 100) {
                        timer = 0;
                        incrementBalance(calculateUpgradeIdleGeneration(upgrade));
                    }
                }
                upgradeTimers.current[upgrade.name] = timer;
            });

            // Doesn't update the UI currently.
        }, 100);

        return () => clearInterval(timerInterval);
    }, []);

    return null;
}

