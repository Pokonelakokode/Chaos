import {IPlayer, ISpellType, IStats,  SpellTypes} from "../reducers/players";
import {Dispatch} from "./index";
import {store} from "../index";
import {positions} from "../reducers/board";
import {PageStateActionTypes} from "./pageState";
import {IPages} from "../reducers/pageState";
import {GetState} from "../reducers";
import {GameActionTypes} from "./game";
import {randomKey, shuffle} from "../utils";
import any = jasmine.any;
import {ICreature} from "../reducers/creatures";
import {IRoundType, RoundTypes} from "../reducers/game";

export enum PlayerActionTypes {
    SET = 'PLAYER.SET',
    ADD = 'PLAYER.ADD',
    REMOVE = 'PLAYER.REMOVE',
    SHUFFLE = 'PLAYER.SHUFFLE',
    INIT_PLAYERS = 'PLAYER.INIT_PLAYERS',
    CREATE_STATS = 'PLAYER.CREATE_STATS',
    STEP = 'PLAYER.STEP',
    RESET_POINTS = 'PLAYER.RESET_POINTS',
    REMOVE_MOVE_POINT = 'PLAYER.REMOVE_MOVE_POINT',
}

export type PlayerActions = {
    SET: {
        type: typeof PlayerActionTypes.SET,
        path: string[],
        data: any
    }
    ADD: {
        type: typeof PlayerActionTypes.ADD,
        player: IPlayer
    }
    REMOVE: {
        type: typeof PlayerActionTypes.REMOVE,
        index: number
    }
    SHUFFLE: {
        type: typeof PlayerActionTypes.SHUFFLE,
    }
    SET_POSITIONS: {
        type: typeof PlayerActionTypes.INIT_PLAYERS,
        positions: {row:number,column:number}[]
    }
    RESET_POINTS: {
        type : typeof PlayerActionTypes.RESET_POINTS
    }
    STEP: {
        type: typeof PlayerActionTypes.STEP,
        name: string,
        row: number,
        col: number,
    }
    REMOVE_MOVE_POINT: {
        type: typeof PlayerActionTypes.REMOVE_MOVE_POINT,
        name: string,
        points: number
    }
}

export const resetMovementPoints = ():PlayerActions['RESET_POINTS'] => ({type: PlayerActionTypes.RESET_POINTS});

export const createSpells = (spellNumber:number = 1):ISpellType[] => {
    let spells:ISpellType[] = [];
    for (let i = 0; i < spellNumber; i++) {
        spells.push(randomKey(SpellTypes));
    }
    return spells;
};


export type stepPlayer = (row:number,col:number) => any

export const stepPlayer:stepPlayer = (row:number,col:number) => (dispatch:Dispatch,state:GetState) => {
    const {board:{rows,columns},game:{selectedCharacter:{name}},players} = state();
    if(name === null) return null;
    const player = state().players.find((player) => player.name === name)!;
    const existingCharacter = getFromCoordinate(row,col,players);
    if(existingCharacter){
        if(isPlayer(existingCharacter)){
            if(player.attackPoints === 0) return null;
            if(attack(player!,existingCharacter)){
                // dispatch(killPlayer(existingCharacter,existingCharacterId!));
                dispatch({
                    type:PlayerActionTypes.STEP,
                    col:col,
                    name:name,
                    row:row
                })
            }
            dispatch({
                type:PlayerActionTypes.SET,
                path:[name.toString(),'attackPoints'],
                data: player.attackPoints - 1
            })
        }

    }
    else {
        const [colStep,rowStep] = [col - player.col!,row - player.row!];
        const maxStep = Math.abs(rowStep) > Math.abs(colStep) ? Math.abs(rowStep) : Math.abs(colStep);
        if(row < 0 || row > rows || col < 0 || col > columns || maxStep > player!.movementPoints!) return null;
        dispatch({
            type: PlayerActionTypes.REMOVE_MOVE_POINT,
            name,
            points: maxStep
        });
        return dispatch({
            type:PlayerActionTypes.STEP,
            col:col,
            name:name,
            row:row
        })
    }
};

const killPlayer = (player:IPlayer,playerId:number) => (dispatch:Dispatch,state: GetState) => {
    const playerOrder = state().game.playerOrder

};
// type IFromCoordinate = [IPlayer,'PLAYER'] | [ICreature,'CREATURE'] | [null,'NULL']
export type IFromCoordinate = IPlayer | ICreature | null

export function isPlayer(obj: IFromCoordinate): obj is IPlayer {return !!(obj as IPlayer).name;}

export const getFromCoordinate = (row: number,col: number,players:IPlayer[]):IFromCoordinate  => {
    return players.reduce((target:IFromCoordinate,player) => {

        if(player.row === row && player.col === col) return player;
        const creature = player.creatures.find(creature => creature.col === col && creature.row === row);
        return creature ? creature : target
    },null)
};

const attack = (attacker:IPlayer,defender:IPlayer) => {
    const attack = attacker.stats!.combat + Math.floor(Math.random() * 9);
    const defence = defender.stats!.defence + Math.floor(Math.random() * 9);
    console.log('ATTACK:',attack,'DEFENCE:',defence,'SUCCESS:',attack > defence);
    return attack > defence
};

const getCharacterInPosition = (players:IPlayer[],row:number,col:number):[IPlayer|null,number|null] => {
    let p:IPlayer|null = null;
    let id:number|null = null;
    for (let i = 0; i < players.length; i++) {
        if(players[i].row === row && players[i].col === col){
            p = players[i];
            id = i;
            break;
        }
    }
    return [p,id];
    // return players.find(player => player.row === row && player.col === col);
}

export const addPlayer = (player:IPlayer) => ({
    type: PlayerActionTypes.ADD,
    player
});

export const setPlayer = (path:string[],data:any) => ({
    type: PlayerActionTypes.SET,
    data,
    path
});

export const removePlayer = (index:number) => ({
    type: PlayerActionTypes.REMOVE,
    index
});

export const createStats = ():IStats => {
    let points = 16;
    let stats:any = {combat:1,defence:1,magicResistance:1,manoeuvreRating:1};
    let index = 0;
    do {
        let rand = Math.floor(Math.random() * 8);
        let p =  rand > points ? points : rand;
        p = stats[Object.keys(stats)[index]] + p > 9 ? 9 - stats[Object.keys(stats)[index]] : p;
        stats[Object.keys(stats)[index]] += p;
        index = index === Object.keys(stats).length - 1 ? 0 : index + 1;
        points -= p;
    } while (points > 0);
    return stats
};

export const shufflePlayers = () => ({
    type: PlayerActionTypes.SHUFFLE
});

export function playerOrder(state: GetState) {
    const playerOrder = shuffle(state().players.map((player,id) => id));
    let round = 1;
    let currentIndex = 0;
    let newRound = true;
    let roundType:IRoundType = "MOVE";
    let currentPlayer = state().players[playerOrder[currentIndex]];
    return {
        currentPlayer: function ():[IPlayer,number] {
            return [state().players[playerOrder[currentIndex]],currentIndex]
        },
        nextPlayer: function ():{round:number,currentIndex:number,currentPlayer:IPlayer,roundType: IRoundType,newRound:boolean} {
            // if(state().players.filter(player => player.dead).length < 2) return "GAME OVER";
            currentIndex = currentIndex - 1 === state().players.length ? 0 : currentIndex + 1;
            [round,newRound] = currentIndex - 1 === state().players.length ? [round + 1,false] : [round,true];
            roundType = currentIndex - 1 === state().players.length ? roundType === "MOVE" ? "CAST" : "MOVE" : roundType;
            currentPlayer = state().players[playerOrder[currentIndex]];
            if(currentPlayer.dead) {
                return this.nextPlayer();
            }
            else {
                return {round, currentIndex, currentPlayer,roundType,newRound}
            }

        },
        getGameStatus: function() {return{
            round,roundType,newRound
        }},
        getPlayers: function () {
            return playerOrder.map(index => {
                return state().players[index];
            })
        }

    }
}

// export function playerOrder(state:GetState) {
//     let index = 0;
//     let newRound = false;
//     while (true){
//         yield [index,newRound];
//         if(state().players.length - 1 ===  index){
//             newRound = true;
//             index = 0;
//         }
//         else {
//             index++;
//             newRound = false;
//         }
//     }
//
// }

export const initPlayers = () => {
    return (dispatch:Dispatch,state:typeof store.getState) => {
        const {board: {columns,rows},players} = state();
        dispatch({type:PlayerActionTypes.INIT_PLAYERS,positions:positions(rows,columns,players.length)});
        dispatch({type:PageStateActionTypes.SET,path:['page'],data:IPages.game})
    }
};

export type IPlayerActions = PlayerActions[keyof  PlayerActions]