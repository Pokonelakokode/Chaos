import {GameActionTypes, IGameActions} from "../actions/game";
import {setIn} from "immutable";

export enum CharacterTypes {
    PLAYER = 'PLAYER',
    CREATURE = 'CREATURE',
    NULL = ""
}

export type IRoundType = keyof typeof RoundTypes;

export enum RoundTypes {
    CAST = "CAST",
    MOVE = "MOVE"
}

export interface ICursor {
    row: number,
    col: number
}

export interface IGame {
    round: number,
    roundType: IRoundType,
    playerOrder: number[],
    currentPlayer: number,
    cursor: ICursor,
    selectedSpellIndex: number | null,
    selectedCharacter: ISelectedCharacter
}

export interface ISelectedCharacter {
    id: number | null,
    characterType: CharacterTypes
}

export const initialGame:IGame = {
    round: 0,
    playerOrder: [],
    roundType: RoundTypes.CAST,
    currentPlayer: 0,
    cursor: {
        col: 0,
        row: 0
    },
    selectedSpellIndex: null,
    selectedCharacter: {
        id: null,
        characterType: CharacterTypes.NULL
    }
};

const game = (state = initialGame, action:IGameActions) => {
    switch (action.type) {
        case GameActionTypes.SET:
            return setIn(state,action.path,action.data);
        case GameActionTypes.INIT:
            return action.state;
        case GameActionTypes.SELECT_CHARACTER:
            return {
                ...state,
                selectedCharacter: {
                    id: state.selectedCharacter.id === action.id && state.selectedCharacter.characterType === action.characterType ? null : action.id,
                    characterType: state.selectedCharacter.id === action.id && state.selectedCharacter.characterType === action.characterType ? CharacterTypes.NULL : action.characterType,
                }
            };
        case GameActionTypes.NEXT_PLAYER:
            return {
                ...state,
                currentPlayer: state.currentPlayer === state.playerOrder.length - 1 ? 0 : state.currentPlayer + 1,
                selectedCharacter: {
                    id: null,
                    characterType: CharacterTypes.NULL
                },
                round: state.currentPlayer === state.playerOrder.length - 1 ? state.round + 1 : state.round,
                roundType: state.currentPlayer === state.playerOrder.length - 1 ? state.roundType === "CAST" ? "MOVE" : "CAST" : state.roundType,
                selectedSpellIndex: null
            };
        case GameActionTypes.SELECT_SPELL:
            return {
                ...state,
                selectedSpellIndex: action.id
            };
        case GameActionTypes.STEP_CURSOR:
            let row = state.cursor.row + action.row < 0 ? 0 : state.cursor.row + action.row;
            row = state.cursor.row + action.row < 0 ? 0 : state.cursor.row + action.row;
            return {
                ...state,
                cursor: {
                    col: action.col,
                    row: action.row
                }
            };
        default:
            return state
    }
};

export default game