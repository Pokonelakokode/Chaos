import {createAction, createSelector} from "@reduxjs/toolkit";
import {getBoard} from "../board/board.actions";
import * as actionTypes from './players.actionTypes';

export const SpellTypes: { [key: string]: Player.Spell } = {
    KING_COBRA: {
        name: "King cobra",
        chance: 80,
        alignment: 1,
        range: 1,
    },
};

export function randomKey<T, K>(obj: typeof SpellTypes): SpellType {
    const keys = Object.keys(obj) as SpellType[];
    // tslint:disable-next-line:no-bitwise
    return keys[keys.length * Math.random() << 0];
}

export const addPlayer = createAction<Player.Player>(actionTypes.ADD);
export const setPlayer = createAction<PathSetter<any>>(actionTypes.SET);
export const removePlayer = createAction<Player.Player["id"]>(actionTypes.REMOVE);
export const shufflePlayers = createAction(actionTypes.SHUFFLE);
export const initPlayers = createAction<{row:number,column:number}[]>(actionTypes.INIT_PLAYERS);
export const step = createAction<{row: number, col: number, id: Player.Player['id']}>(actionTypes.STEP);
export const resetPoints = createAction(actionTypes.RESET_POINTS);
export const removeAttackPoint = createAction<Player.Player['id']>(actionTypes.REMOVE_ATTACK_POINT);
export const killPlayer = createAction<Player.Player['id']>(actionTypes.KILL_PLAYER)



export const PlayerActions = {
    addPlayer,
    setPlayer,
    removePlayer,
    shufflePlayers,
    initPlayers,
    step,
    resetPoints
}


export const getPlayers = (state: RootState) => state.players;
export const getAlivePlayers = (state: RootState) => state.players.filter(player => !player.dead);
export const getPlayersLength = (state: RootState) => state.players.length;
export const getPlayerIds = createSelector(getPlayers, players => players.map(player => player.id));
export const getSelectedCharacterType = (state: RootState) => state.game.selectedCharacter.characterType;
export const getSelectedCharacterId = (state: RootState) => state.game.selectedCharacter.id;
export const getSelectedCharacter = createSelector(
  [getSelectedCharacterId,
  getSelectedCharacterType,
  getPlayers],
  (id, type, players): Player.Player | undefined => {
      return players.find(player => player.id === id)
  }
);
export const coordParams = (state: RootState, params: {row: number, column: number}) => params;
export const getFromCoordinate = createSelector(getPlayers,coordParams, (players, {column, row}) =>
    players.find(player => player.col === column && player.row === row && !player.dead)
)
// export const getFromCoordinate = (row: number, col: number): AppThunk<Player.Player | undefined> => (dispatch, state) => {
//     const players = getPlayers(state());
//     return players.find(player => player.col === col && player.row === row)
// }


export const resetMovementPoints = (): Player.Actions.RESET_POINTS => ({type: actionTypes.RESET_POINTS});

export const createSpells = (spellNumber:number = 1):SpellType[] => {
    const spells:SpellType[] = [];
    for (let i = 0; i < spellNumber; i++) {
        spells.push(randomKey(SpellTypes));
    }
    return spells;
};

export const stepCharacter = (character: Player.Player, column:number, row:number): AppThunk => (dispatch , state) => {
    // const players = getPlayers(state());
    // const {columns, rows} = getBoard(state());
    // const existingCharacter = dispatch(getFromCoordinate(row,column));
    dispatch(step({id: character.id, row, col: column}))
    // if(existingCharacter){
    //     if(isPlayer(existingCharacter)){
    //         if(character.attackPoints === 0) return null;
    //         if(attack(character!,existingCharacter)){
    //             // dispatch(killPlayer(existingCharacter,existingCharacterId!));
    //             dispatch({
    //                 type:actionTypes.STEP,
    //                 col,
    //                 name,
    //                 row
    //             })
    //         }
    //         dispatch({
    //             type:actionTypes.SET,
    //             path:[name.toString(),'attackPoints'],
    //             data: character.attackPoints - 1
    //         })
    //     }
    //
    // }
    // else {
    //     const [colStep,rowStep] = [col - character.col!,row - character.row!];
    //     const maxStep = Math.abs(rowStep) > Math.abs(colStep) ? Math.abs(rowStep) : Math.abs(colStep);
    //     if(row < 0 || row > rows || col < 0 || col > columns || maxStep > character!.movementPoints!) return null;
    //     dispatch({
    //         type: actionTypes.REMOVE_MOVE_POINT,
    //         name,
    //         points: maxStep
    //     });
    //     dispatch({
    //         type:actionTypes.STEP,
    //         col,
    //         name,
    //         row
    //     })
    // }
};

// const killPlayer = (player:IPlayer,playerId:number) => (dispatch:Dispatch,state: GetState) => {
//     const playerOrder = state().game.playerOrder
//
// };
// type IFromCoordinate = [IPlayer,'PLAYER'] | [ICreature,'CREATURE'] | [null,'NULL']

export function isPlayer(character: Player.Player | undefined): character is Player.Player {
    return !!character?.id
}

export function isEnemy(currentCharacter: Player.Player, targetCharacter: Player.Player) {
    return currentCharacter.id !== targetCharacter.id
}


// export const getFromCoordinate = (row: number,col: number):IFromCoordinate  => {
//     return players.reduce((target:IFromCoordinate,player) => {
//
//         if(player.row === row && player.col === col) return player;
//         const creature = player.creatures.find(creature => creature.col === col && creature.row === row);
//         return creature ? creature : target
//     },null)
// };

export const attack = (attacker:Player.Player,defender:Player.Player) => {
    const attackStat = attacker.stats!.combat + Math.floor(Math.random() * 9);
    const defenceStat = defender.stats!.defence + Math.floor(Math.random() * 9);
    console.log('ATTACK:',attackStat,'DEFENCE:',defenceStat,attackStat > defenceStat ? 'SUCCESS' : 'FAIL');
    return attackStat > defenceStat
};

// const getCharacterInPosition = (players:Player.Player[],row:number,col:number):[Player.Player|null,number|null] => {
//     let p:Player.Player|null = null;
//     let id:number|null = null;
//     for (let i = 0; i < players.length; i++) {
//         if(players[i].row === row && players[i].col === col){
//             p = players[i];
//             id = i;
//             break;
//         }
//     }
//     return [p,id];
//     // return players.find(player => player.row === row && player.col === col);
// }



export const createStats = (): Player.Stats => {
    let points = 16;
    const stats:any = {combat:1,defence:1,magicResistance:1,manoeuvreRating:1};
    let index = 0;
    do {
        const rand = Math.floor(Math.random() * 8);
        let p =  rand > points ? points : rand;
        p = stats[Object.keys(stats)[index]] + p > 9 ? 9 - stats[Object.keys(stats)[index]] : p;
        stats[Object.keys(stats)[index]] += p;
        index = index === Object.keys(stats).length - 1 ? 0 : index + 1;
        points -= p;
    } while (points > 0);
    return stats
};



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

