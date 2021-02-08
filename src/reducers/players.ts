import {setIn} from "immutable";
import {createSpells, createStats, IPlayerActions, PlayerActionTypes} from "../actions/player";
import {shuffle} from "../utils";
import {ICreature} from "./creatures";

export enum IPlayerTypes {
    "GREEN" = "GREEN",
    "RED" = "RED",
}

export type ISpellType = keyof typeof SpellTypes;

export interface ISpell {
    name: string;
    chance: number;
    alignment: number;
    range: number;
}

export const SpellTypes: {[key: string]: ISpell} = {
    KING_COBRA: {
        name: "King cobra",
        chance: 80,
        alignment: 1,
        range: 1,
    },
};

export const PlayerTypes = {
    GREEN: {
        img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAyCAYAAAC+jCIaAAADwklEQVR4nO2ZwW0cMQxF2UJqcBOuLm3k5hLckyuxD8EstFxRIsVPkVqvACFA4Ej/iY+a8YTIOd7+0jef3jV3jV72E3mQHB+f//J5r8DvX39u85Ti8Nyz/BUZiGI40uRqQ/agNJApwRmDJnv1hkFzpN5YFqlmcO26O6E8+TkLX/tZOLaPCJiMTrHevNWaI4LjyBtLuoIzYVZYqj0OiTAcZV/clTfUbWbfWO2wvjMS3c3bOJ0jOz8R2eUaFaTC0PA0t9TTcZSQiug/wPXn6Z1+jVWxrvynclTJTUTrnx1I6PQKcJ4bq0L+ayxwlMrvfRzWgqE5z+zGqjJWOUoMwAv83ahQnKML0oxjOVa/nTCgckP74kvVCsLGMRzSfwV4vmelgAB4Kn3HOpZDCumVq+mY7cOTObtBEI1dgUP1KcEjVgu0Aw5VjHZGZ+b5kdlTOCIhuFy9iWaJkOolVjGIVdlWJUQ/PrIKtavZI7LfQWTJZTwEk1i7skXVZMeZhr93vcSqJd3u/GGvKJWKMZBqCJvxGFzgUNcjOytEsMpFeYlVQ7AlySK+m+wUq3J+XqBTpIJIVrkwq2JV4vCKlc3RZP8meokVxmFd+2JYESubg0tlEqtXnGyhqopl3Yt3+qgovXWiWGZrtnmIHqfr1kJCra5TSayeGBaxZgUZ3VZIHs35jKSCiuWFkvY5TaxZhmixkE1uaQi4WMSuca9Y0p5RYiHlmh1mb99VsaS1IsTSNASfLrF6iyHF4nujxOKZkY8Q7zlqxGr/XUSjXBlG64aJJS22Cqbd3yuWlBnZ6Z6z1Iq1g2Mk7ciDGYf6MPiCEbcWz8HFkkCiG0IqiPVMRwxWDi/LSKze2UtZNGdAnYNLEat3yKNiajNniNVj0fzciCGawyK46gAqidUD1fxMVG6PWCgOlFQaDqGpVY1+N2bXJBrOWhTtqFCUKA4kg4XD8vR4GKNNR8/gE8TKKohntPsQ8MbdzfEgVk8uJFQUR2Qz9M4mikNqbiTDDo6uWJEzgmGHULuK0tvnKI7dQkXKdR1+dCF4QXbIdRRHplRowXbJJBUEKdfu84dzZAuFFisje4Rcx3NkC4USLOO2kgriLUrW2UM5skVCyZUllVSQ1aJknjuSAwqCKq6VIVOqUVEya5HJAYVB/mpvAcp8BKKLkp0fKhdaBs9aKyBV3qukv68uFZoDLteKWIjOGO2H+kjK15DeRTzvKM/C0QVbmRaxYGGF3LO9Rvk1WaXsKLGegQMyVsTLyqE5wOgm+C0csGE5jKwMlbOfzvEDGBx+dCcFBbsAAAAASUVORK5CYII=",
        frames: 4,
        speed: 300,
        loop: true,
    },
    RED: {
        frames: 3,
        img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAyCAYAAAC+jCIaAAACRUlEQVR4nO3XXW4CMQwE4JyAY+x5ezDuRJ8QIdoQx/HPOLElHlrtsvPVE1RKyTl2ntf18s6Q08xuS4H3PK/r1b7urvHINjMUB/rcGWpHCFMP0YZ//4yKmnWgDtVRX2+dkTQUCGz4ak50QHs6gHAn5M5QKgdq7nZ2cQwh7bX2CWlzZyg/DgjqUBwhSjaChEAUugN5eoe8RDsgVAg6apeF7OL4+Y8i9VsJwuzgmDVAOjgIRFw6QBySAE9gOkAclgBNUDoAHJ7hJZHeGdMRBFCI33C8c6YjGIIC8c6ZDgDAzPPfiB4kHUAOzoMl/wDU9xqdjpMd0sWScEyFkl7GzHtKLiQdyg7uAyUhVEz58bGbDiwH5eOuO14QTpZ02DqGgTwgA0w6lA1Sju6NnHskMXfPSIeNQcoBu5D6OUPEwQ6rYs06oBcyM6c6LIu1BOHivTGnOjQMIuXacSGcexAdoYtVh5u9HgmDUizJcnnldykWKgalVFksBgQZc1qxNPNvV6wVEFKxLA4Jcv6vkDNgeFBwh3epLHfBAv09HpCYyI6Vosw6tAzLKM5CLEBRHaulgiyWxQmxAEV2WJYqi3WIg1uqlWKpl2sXTFRH+56c/N6GIcxiIVqgqA7usyWKpbKLXTCRHd6lEi+WBAahWNEdWxVLCuMN2sEhYVh5jyxWOtTyi5VLahneoJMdSPm/hhNKeiHp+Eydy+NgqJWLEpQDqq8VC364o/0991BpOYYYiZdq+HTAOligu3vMA3cmHViOnJycnJycjeYfpv5//XvWo0AAAAAASUVORK5CYII=",
        loop: true,
        speed: 200,
    },
};

export interface IPlayer {
    name: string;
    col?: number;
    row?: number;
    dead: boolean;
    playerType: IPlayerTypes;
    spells: ISpellType[];
    creatures: ICreature[];
    stats: IStats;
    movementPoints: number;
    attackPoints: number;
}

export interface IStats {
    [key: string]: any;

    "combat": number;
    "defence": number;
    "magicResistance": number;
    "manoeuvreRating": number;
}

export const initialStats: IStats = {
    combat: 1,
    defence: 1,
    magicResistance: 1,
    manoeuvreRating: 1,
};

export const initialPlayer: IPlayer = {
    attackPoints: 0,
    creatures: [],
    dead: false,
    movementPoints: 0,
    name: "",
    playerType: IPlayerTypes.GREEN,
    spells: [],
    stats: {...initialStats},
};

export const initialPlayers: IPlayer[] = [];

export const players = (state = initialPlayers, action: IPlayerActions): IPlayer[] => {
    switch (action.type) {
        case PlayerActionTypes.SET:
            return setIn(state, action.path, action.data);
        case PlayerActionTypes.ADD:
            return [...state, action.player];
        case PlayerActionTypes.STEP:
            return state.map((player) => {
                if (player.name !== action.name) {return player; } else {
                    return {
                        ...player,
                        col: action.col,
                        row: action.row,
                    };
                }
            });
        case PlayerActionTypes.REMOVE_MOVE_POINT:
            return state.map((player) => {
                if (player.name !== action.name) {return player; } else {
                    return {...player, movementPoints: player.movementPoints - action.points};
                }
            });
        case PlayerActionTypes.REMOVE:
            return state.filter((player, id) => id !== action.index);
        case PlayerActionTypes.RESET_POINTS:
            return state.map((player) => ({...player, movementPoints: 1, attackPoints: 1}));
        case PlayerActionTypes.SHUFFLE:
            return Array.from(shuffle(state));
        case PlayerActionTypes.INIT_PLAYERS:
            return state.map((player, id) => ({
                ...player,
                row: action.positions[id].row,
                col: action.positions[id].column,
                stats: createStats(),
                dead: false,
                spells: createSpells(3),
                movementPoints: 1,
                attackPoints: 1,
            }));

        default:
            return state;
    }
};
