export type CharacterTypes = 'PLAYER' | 'CREATURE' | "NULL";
export type IRoundType = keyof typeof RoundTypes;

export enum RoundTypes {
    CAST = "CAST",
    MOVE = "MOVE"
}

export type ICursor = {
    x: number,
    y: number
}

export interface IGame {
    currentPlayer: number,
    playerOrder?: number[],
    cursor: {
        x: number
        y: number
    },
    selectedSpellIndex: number | null,
    selectedCharacter: ISelectedCharacter
}

export interface ISelectedCharacter {
    name: string,
    characterType: CharacterTypes
}

export const initialGame:Game.Store = {
    round: 0,
    roundType: RoundTypes.MOVE,
    playerOrder: [],
    cursor: {
        y: 0,
        x: 0
    },
    selectedSpellIndex: null,
    selectedCharacter: {
        id: "",
        characterType: "NULL"
    }
};
