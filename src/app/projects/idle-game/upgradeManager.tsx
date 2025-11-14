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

async function loadUpgrades(setClickIncrement: Dispatch<SetStateAction<number>>, setUpgrades: Dispatch<SetStateAction<IUpgrade[]>>, upgradeTimers: Record<string, number>, setUpgradeTimers: Dispatch<SetStateAction<Record<string, number>>>) {
    const cookiesFetch = await getCookie(SAVE_DATA_COOKIE_UPGRADES);
    const parsedJson = cookiesFetch ? JSON.parse(cookiesFetch) : [];
    
    let loadedUpgrades = DEFAULT_UPGRADES;
    let loadedClickIncrement = 0;
    let newUpgradeTimers: Record<string, number> = {};
    parsedJson.forEach((upgrade: IUpgrade) => {
        let loadedUpgrade = loadedUpgrades.find(elem => elem.name === upgrade.name);
        if (loadedUpgrade) {
            loadedUpgrade.numberOwned = upgrade.numberOwned;
            loadedClickIncrement += upgrade.numberOwned * upgrade.clickIncrement;
            newUpgradeTimers[upgrade.name] = 0;
        }
    })

    setUpgradeTimers(newUpgradeTimers);
    setClickIncrement((currentClickIncrement: number) => currentClickIncrement + loadedClickIncrement);
    setUpgrades(loadedUpgrades);
}

async function saveUpgrades(upgrades: IUpgrade[]) {
    await setCookie(SAVE_DATA_COOKIE_UPGRADES, JSON.stringify(upgrades));
}

export const UpgradeManager = () => {
    const { setClickIncrement, incrementBalance , upgrades, setUpgrades, upgradeTimers, setUpgradeTimers} = useGame();

    const upgradesRef = useRef<IUpgrade[]>([]);
    const upgradeTimersRef = useRef<Record<string, number>>(upgradeTimers);
    
    useEffect(() => {
        upgradesRef.current = upgrades;
        if (upgrades.length === 0) {
            loadUpgrades(setClickIncrement, setUpgrades, upgradeTimers, setUpgradeTimers);
        } else {
            saveUpgrades(upgrades);
        }
    }, [upgrades]);

    useEffect(() => {
        upgradeTimersRef.current = upgradeTimers;
    }, [upgradeTimers]);

    useEffect(() => {
        var timerInterval = setInterval(function(){
            let upgradeTimersCpy: Record<string, number> = {...upgradeTimersRef.current};
            upgradesRef.current.forEach((upgrade: IUpgrade) => {
                let timer = upgradeTimersCpy[upgrade.name];
                if (timer != undefined && upgrade.numberOwned > 0) {
                    timer += (1.0 / upgrade.idleCompletionDuration);
                    if (timer >= 100) {
                        timer = 0;
                        incrementBalance(calculateUpgradeIdleGeneration(upgrade));
                    }
                }
                upgradeTimersCpy[upgrade.name] = timer;
            });
            setUpgradeTimers(upgradeTimersCpy);
        }, 10);

        return () => clearInterval(timerInterval);
    }, []);

    return null;
}

