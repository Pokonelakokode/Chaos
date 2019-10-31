import {IPlayer, ISpellType, IStats,  SpellTypes} from "../reducers/players";
import {Dispatch} from "./index";
import {store} from "../index";
import {positions} from "../reducers/board";
import {PageStateActionTypes} from "./pageState";
import {IPages} from "../reducers/pageState";
import {GetState} from "../reducers";
import {GameActionTypes} from "./game";
import {randomKey} from "../utils";
import any = jasmine.any;
import {ICreature} from "../reducers/creatures";

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
        id: number,
        row: number,
        col: number,
    }
    REMOVE_MOVE_POINT: {
        type: typeof PlayerActionTypes.REMOVE_MOVE_POINT,
        id: number,
        points: number
    }
}

export const resetMovementPoints = () => ({type: PlayerActionTypes.RESET_POINTS});

export const createSpells = (spellNumber:number = 1):ISpellType[] => {
    let spells:ISpellType[] = [];
    for (let i = 0; i < spellNumber; i++) {
        spells.push(randomKey(SpellTypes));
    }
    return spells;
};


export type stepPlayer = (row:number,col:number) => any

export const stepPlayer:stepPlayer = (row:number,col:number) => (dispatch:Dispatch,state:GetState) => {
    const {board:{rows,columns},game:{selectedCharacter:{id}},players} = state();
    if(id === null) return null;
    const player = state().players.find((player,i) => i === id)!;
    const [newRow,newCol] = [player!.row! + row, player!.col! + col];
    const [existingCharacter,existingCharacterId] = getCharacterInPosition(players,newRow,newCol);
    if(existingCharacter){
        if(player.attackPoints === 0) return null;
        if(attack(player!,existingCharacter)){
            // @ts-ignore
            dispatch(killPlayer(existingCharacter,existingCharacterId!));
            dispatch({
                type:PlayerActionTypes.STEP,
                col:col,
                id:id,
                row:row
            })
        }
        dispatch({
            type:PlayerActionTypes.SET,
            path:[id.toString(),'attackPoints'],
            data: player.attackPoints - 1
        })
    }
    else {
        const maxStep = Math.abs(row) > Math.abs(col) ? Math.abs(row) : Math.abs(col);
        if(newRow < 0 || newRow > rows || newCol < 0 || newCol > columns || maxStep > player!.movementPoints!) return null;
        dispatch({
            type: PlayerActionTypes.REMOVE_MOVE_POINT,
            id,
            points: maxStep
        });
        return dispatch({
            type:PlayerActionTypes.STEP,
            col:col,
            id:id,
            row:row
        })
    }
};

const killPlayer = (player:IPlayer,playerId:number) => (dispatch:Dispatch,state: GetState) => {
    const {game:{currentPlayer,playerOrder}} = state();
    const playerOrderIndex = playerOrder.findIndex((pl) => pl === playerId);
    if(playerOrderIndex < currentPlayer){
        dispatch({
            type: GameActionTypes.SET,
            path: ['currentPlayer'],
            data: currentPlayer - 1
        })
    }
    dispatch({
        type: GameActionTypes.SET,
        path: ['playerOrder'],
        data: playerOrder.filter(pl => pl !== playerId)
    })
};
type IFromCoordinate = [IPlayer,'PLAYER'] | [ICreature,'CREATURE'] | [null,'NULL']

export const getFromCoordinate = (row: number,col: number,players:IPlayer[]):IFromCoordinate  => {
    return players.reduce((target:IFromCoordinate,player) => {

        if(player.row === row && player.col === col) return [player,'PLAYER'];
        return [player.creatures.find(creature => creature.col === col && creature.row === row),"CREATURE"] || target
    },[null,"NULL"])
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
        let rand = Math.floor(Math.random() * 9);
        let p =  rand > points ? points : rand;
        stats[Object.keys(stats)[index]] += p;
        index = index === Object.keys(stats).length - 1 ? 0 : index + 1;
        points -= p;
    } while (points > 0);
    return stats
};

export const shufflePlayers = () => ({
    type: PlayerActionTypes.SHUFFLE
});

export const initPlayers = () => {
    return (dispatch:Dispatch,state:typeof store.getState) => {
        const {board: {columns,rows},players} = state();
        dispatch({type:PlayerActionTypes.INIT_PLAYERS,positions:positions(rows,columns,players.length)});
        dispatch({type:PageStateActionTypes.SET,path:['page'],data:IPages.game})
    }
};

export type IPlayerActions = PlayerActions[keyof  PlayerActions]