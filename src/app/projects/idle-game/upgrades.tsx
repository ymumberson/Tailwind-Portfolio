export interface IUpgrade {
    name: string;
    cost: number;
    clickIncrement: number;
    idleIncrement: number;
    idleCompletionDuration: number;
    idleCurrentTme: number;
    numberOwned: number;
}

export const DEFAULT_UPGRADES = 
[
    {
        name: "Fruit Picker",
        cost: 10,
        clickIncrement: 0.1,
        idleIncrement: 0,
        idleCompletionDuration: 0,
        idleCurrentTme: 0,
        numberOwned: 0
    },
    {
        name: "Apple",
        cost: 10,
        clickIncrement: 0,
        idleIncrement: 0.1,
        idleCompletionDuration: 1,
        idleCurrentTme: 0,
        numberOwned: 0
    },
    {
        name: "Banana",
        cost: 100,
        clickIncrement: 0,
        idleIncrement: 1.5,
        idleCompletionDuration: 2,
        idleCurrentTme: 0,
        numberOwned: 0
    },
    {
        name: "Cherry",
        cost: 1000,
        clickIncrement: 0,
        idleIncrement: 25,
        idleCompletionDuration: 3,
        idleCurrentTme: 0,
        numberOwned: 0
    },
    {
        name: "Dragon Fruit",
        cost: 10000,
        clickIncrement: 0,
        idleIncrement: 400,
        idleCompletionDuration: 4,
        idleCurrentTme: 0,
        numberOwned: 0
    },
]