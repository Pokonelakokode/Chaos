import {Dispatch} from "./index";
import {GetState} from "../reducers";
import {CharacterTypes, ICharacterTypes, IGame, initialGame, RoundTypes} from "../reducers/game";
import {getFromCoordinate, isPlayer, playerOrder, resetMovementPoints, stepPlayer} from "./player";

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
        state: IGame,
        orderGenerator: ReturnType<typeof playerOrder>
    }
    NEXT_PLAYER: {
        type: typeof GameActionTypes.NEXT_PLAYER,
        currentPlayer: string
    }
    SELECT_CHARACTER: {
        type: typeof GameActionTypes.SELECT_CHARACTER,
        name: string,
        characterType: ICharacterTypes
    }
    SELECT_SPELL: {
        type: typeof GameActionTypes.SELECT_SPELL,
        id: number
    }
    STEP_CURSOR: {
        type: typeof GameActionTypes.STEP_CURSOR,
        x: number,
        y: number
    }
}
export const nextPlayer = () => (dispatch:Dispatch,state:GetState) => {
    const playerOrder = state().game.playerOrder!;
    const {currentPlayer,newRound} = playerOrder.nextPlayer();
    if(newRound) dispatch(resetMovementPoints());
    dispatch({
        type:GameActionTypes.NEXT_PLAYER,
        currentPlayer: currentPlayer.name
    });
    dispatch(cursorToCurrentPlayer())
};

export const cursorToCurrentPlayer = () => (dispatch:Dispatch,state:GetState) => {
    const player = state().game.playerOrder!.currentPlayer()[0];
    dispatch({type:GameActionTypes.STEP_CURSOR,x:player.col!,y: player.row!})
}



export const initGame = () => (dispatch:Dispatch,state:GetState) => {
    const {players} = state();
    dispatch({
        type: GameActionTypes.INIT,
        state: {
            ...initialGame,
            currentPlayer: 0,
            selectedCharacter: {
                name: "",
                characterType: CharacterTypes.NULL
            },
            playerOrder: playerOrder(state)
        }

    });

    dispatch(cursorToCurrentPlayer())
};

export const executeCursor = () => (dispatch:Dispatch,state:GetState) => {
    const {game:{cursor:{x,y},selectedCharacter,playerOrder},players} = state();
    if(playerOrder!.getGameStatus().roundType === RoundTypes.MOVE){
        if(selectedCharacter.characterType === "NULL"){
            const char = getFromCoordinate(x,y,players);
            if(isPlayer(char)){
                dispatch(selectCharacter(char!.name,'PLAYER'))
            }
        }
        else {
            dispatch(stepPlayer(x,y))
        }
    }
}

// export type stepCursor = (row: number,col: number) => GameActions['STEP_CURSOR']
export const stepCursor  = (y:number,x:number) => (dispatch:Dispatch,state:GetState) => {
    const {rows,columns} = state().board;
    let newRow = state().game.cursor.y + y;
    newRow = newRow < 0 ? 0 : newRow > rows - 1 ? rows - 1 : newRow;
    let newCol = state().game.cursor.x + x;
    newCol = newCol < 0 ? 0 : newCol > columns - 1 ? columns - 1 : newCol;
    // const newRow = Math.min(Math.max(state().game.cursor.x + x, 0),board.rows - 1);
    // newCol = Math.min(Math.max(state().game.cursor.y + y, 0),board.columns - 1);
    dispatch({
        type: GameActionTypes.STEP_CURSOR,
        x: newCol,
        y: newRow
    })
};



export type selectSpell = (id: number) => GameActions['SELECT_SPELL']
export const selectSpell:selectSpell = (id) => ({type: GameActionTypes.SELECT_SPELL,id});

export type selectCharacter = (name:string,characterType:ICharacterTypes) => GameActions['SELECT_CHARACTER']

export const selectCharacter:selectCharacter = (name,characterType) => ({
    type: GameActionTypes.SELECT_CHARACTER,
    name,
    characterType
});

export const shiftPlayers = (players:number[]) => {
    players.push(players.shift()!);
    return players
};

export type IGameActions = GameActions[keyof GameActions]