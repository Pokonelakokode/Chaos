import {Dispatch} from "./index";
import {GetState} from "../reducers";
import {CharacterTypes, IGame, initialGame, RoundTypes} from "../reducers/game";
import {shuffle} from "../utils";
import {getFromCoordinate} from "./player";

export enum GameActionTypes {
    SET = 'GAME.SET',
    INIT = 'GAME.INIT',
    NEXT_PLAYER = 'GAME.NEXT_PLAYER',
    SELECT_CHARACTER = 'GAME.SELECT_CHARACTER',
    SELECT_SPELL = 'GAME.SELECT_SPELL',
    STEP_CURSOR = 'GAME.STEP_CURSOR'
}

export type GameActions = {
    SET: {
        type: typeof GameActionTypes.SET,
        path: string[],
        data: any
    }
    INIT: {
        type: typeof GameActionTypes.INIT,
        state: IGame
    }
    NEXT_PLAYER: {
        type: typeof GameActionTypes.NEXT_PLAYER
    }
    SELECT_CHARACTER: {
        type: typeof GameActionTypes.SELECT_CHARACTER,
        id: number,
        characterType: CharacterTypes
    }
    SELECT_SPELL: {
        type: typeof GameActionTypes.SELECT_SPELL,
        id: number
    }
    STEP_CURSOR: {
        type: typeof GameActionTypes.STEP_CURSOR,
        col: number,
        row: number
    }
}
export type nextPlayer = () => void;
export const nextPlayer = () => (dispatch:Dispatch,state:GetState) => {
    dispatch({type:GameActionTypes.NEXT_PLAYER});
    dispatch(cursorToCurrentPlayer())
};

export const cursorToCurrentPlayer = () => (dispatch:Dispatch,state:GetState) => {
    const player = state().players.find((player,id) => state().game.playerOrder[state().game.currentPlayer] === id)!;
    dispatch({type:GameActionTypes.STEP_CURSOR,col:player.col!,row: player.row!})
}

export const initGame = () => (dispatch:Dispatch,state:GetState) => {
    const {players} = state();
    const playerOrder = shuffle(players.map((p,id) => id));
    dispatch({
        type: GameActionTypes.INIT,
        state: {
            ...initialGame,
            currentPlayer: 0,
            selectedCharacter: {
                id: null,
                characterType: CharacterTypes.NULL
            },
            playerOrder,
            round: 1
        }
    })
    dispatch(cursorToCurrentPlayer())
};

export const executeCursor = () => (dispatch:Dispatch,state:GetState) => {
    const {game:{cursor:{row,col},roundType,selectedCharacter},players} = state();
    if(roundType === RoundTypes.MOVE){
        if(selectedCharacter === null){
            const char = getFromCoordinate(row,col,players);

        }
    }
}

// export type stepCursor = (row: number,col: number) => GameActions['STEP_CURSOR']
export const stepCursor  = (row:number,col:number) => (dispatch:Dispatch,state:GetState) => {
    const board = state().board;
    const newRow = Math.min(Math.max(state().game.cursor.row + row, 0),board.rows - 1);
    const newCol = Math.min(Math.max(state().game.cursor.col + col, 0),board.columns - 1);
    dispatch({
        type: GameActionTypes.STEP_CURSOR,
        row: newRow,
        col: newCol
    })
};



export type selectSpell = (id: number) => GameActions['SELECT_SPELL']
export const selectSpell:selectSpell = (id) => ({type: GameActionTypes.SELECT_SPELL,id});

export type selectCharacter = (id:number,characterType:CharacterTypes) => GameActions['SELECT_CHARACTER']

export const selectCharacter:selectCharacter = (id,characterType) => ({
    type: GameActionTypes.SELECT_CHARACTER,
    id,
    characterType
});

export const shiftPlayers = (players:number[]) => {
    players.push(players.shift()!);
    return players
};

export type IGameActions = GameActions[keyof GameActions]