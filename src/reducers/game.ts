import {GameActionTypes, IGameActions} from "../actions/game";
import {createSlice} from "@reduxjs/toolkit";
import {assocPath} from "ramda";


export enum CharacterTypes {
    PLAYER = 'PLAYER',
    CREATURE = 'CREATURE',
    NULL = "NULL"
}
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
    currentPlayer: 0,
    playerOrder: [],
    cursor: {
        y: 0,
        x: 0
    },
    selectedSpellIndex: null,
    selectedCharacter: {
        name: "",
        characterType: CharacterTypes.NULL
    }
};

const game = createSlice({
    name: 'game',
    initialState: initialGame,
    reducers: {
        [GameActionTypes.SET]: (state, {payload: {path, data}}: Game.Actions.SET) => {
            return assocPath(path, data, state);
        },
        [GameActionTypes.INIT]: (state, action: Game.Actions.INIT) => action.payload,
        [GameActionTypes.SELECT_CHARACTER]: (state, {payload: {name, characterType}}: Game.Actions.SELECT_CHARACTER) => {
            return {
                ...state,
                selectedCharacter: name === state.selectedCharacter.name && characterType === state.selectedCharacter.characterType
                    ? {name, characterType}
                    : {name: "", characterType: CharacterTypes.NULL}
            }
        },
        [GameActionTypes.NEXT_PLAYER]: (state, action: Game.Actions.NEXT_PLAYER) => {
            return {
                ...state,
                currentPlayer: state.playerOrder.length - 1 > state.currentPlayer ? state.currentPlayer++ : 0
            }
        }
}});

// const game = (state = initialGame, action:IGameActions) => {
//     switch (action.type) {
//         case GameActionTypes.SET:
//             return setIn(state,action.path,action.data);
//         case GameActionTypes.INIT:
//             return action.state;
//         case GameActionTypes.SELECT_CHARACTER:
//             return {
//                 ...state,
//                 selectedCharacter: {
//                     name: state.selectedCharacter.name === action.name && state.selectedCharacter.characterType === action.characterType ? "" : action.name,
//                     characterType: state.selectedCharacter.name === action.name && state.selectedCharacter.characterType === action.characterType ? CharacterTypes.NULL : action.characterType,
//                 }
//             };
//         case GameActionTypes.NEXT_PLAYER:
//             return {
//                 ...state,
//                 currentPlayer: action.currentPlayer,
//                 selectedCharacter: {
//                     name: "",
//                     characterType: CharacterTypes.NULL
//                 },
//                 selectedSpellIndex: null
//             };
//         case GameActionTypes.SELECT_SPELL:
//             return {
//                 ...state,
//                 selectedSpellIndex: action.id
//             };
//         case GameActionTypes.STEP_CURSOR:
//             let row = state.cursor.x + action.y < 0 ? 0 : state.cursor.x + action.y;
//             row = state.cursor.x + action.y < 0 ? 0 : state.cursor.x + action.y;
//             return {
//                 ...state,
//                 cursor: {
//                     x: action.x,
//                     y: action.y
//                 }
//             };
//         default:
//             return state
//     }
// };

export default game