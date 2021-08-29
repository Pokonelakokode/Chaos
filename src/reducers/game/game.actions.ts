import {CharacterTypes, initialGame, RoundTypes} from "./game.types";
import {
  attack,
  getFromCoordinate,
  getPlayerIds,
  getPlayers,
  getSelectedCharacter,
  isPlayer,
  killPlayer,
  removeAttackPoint,
  resetMovementPoints,
  stepCharacter
} from "../players/player.actions";
import {createAction, createSelector} from "@reduxjs/toolkit";
import {shuffle} from "../../utils";
import {setCurrentPage} from "../pageState/pageState.actions";
import {IPages} from "../pageState/pageState.types";
import * as actionTypes from './game.actionTypes';

export const getCurrentPlayerId = (state: RootState) => state.game.currentPlayer;
export const getPlayerOrder = (state: RootState) => state.game.playerOrder;
export const getLivingPlayerOrder = createSelector(
  getPlayerOrder,
  getPlayers,
  (order, players) => {
    return order.filter((id) => !players.find((player) => id === player.id)!.dead)
  }
);
export const getCursor = (state: RootState) => state.game.cursor;
export const getCurrentPlayer = createSelector(
  getCurrentPlayerId,
  getPlayers,
  (id, players) => players.find(player => player.id === id));
export const getSpells = createSelector(getCurrentPlayer, (player) => player && player.spells);
export const getCurrentPlayerIndex = createSelector(
  getCurrentPlayerId,
  getLivingPlayerOrder,
  (currentPlayer, order) => order.indexOf(currentPlayer!))
export const isNewRound = createSelector(getCurrentPlayerIndex, (index) => index === 0);
export const getRound = (state: RootState) => state.game.round;
export const getRoundType = (state: RootState) => state.game.roundType;

// PARAMS
export const playerIdParam = (state: RootState, param: string) => param;
export const isPlayerOnTurn = createSelector(getCurrentPlayerId, playerIdParam, (currentId, id) => currentId === id);
export const isPlayerSelected = createSelector(getSelectedCharacter, playerIdParam, (selectedCharacter, id) =>
  selectedCharacter && selectedCharacter.id === id);


export const nextPlayerAction = createAction<Player.Player['id']>(actionTypes.NEXT_PLAYER)
export const setGame = createAction<PathSetter<any>>(actionTypes.SET);
export const initGameAction = createAction<Game.Store>(actionTypes.INIT)

export const nextPlayer = (): AppThunk => (dispatch, state) => {
  const currentPlayerId = getCurrentPlayerId(state());
  const playerOrder = getLivingPlayerOrder(state());
  if (playerOrder.length > 1) {
    const currentIndex = playerOrder.indexOf(currentPlayerId!);
    const nextPlayerId = playerOrder[currentIndex + 1 < playerOrder.length ? currentIndex + 1 : 0];
    dispatch(nextPlayerAction(nextPlayerId))
    if (isNewRound(state())) {
      dispatch(resetMovementPoints());
      // dispatch(switchRoundType());
    }
    dispatch(selectCharacter({id: "", characterType: "NULL"}))
    dispatch(cursorToCurrentPlayer())
  } else {
    dispatch(setCurrentPage(IPages.CONFIG));
  }
};

export const cursorToCurrentPlayer = (): AppThunk => (dispatch, state) => {
  const player = getCurrentPlayer(state());
  dispatch(stepCursor({x: player!.col!, y: player!.row!}))
}
// TODO DO THIS SHIT!!!!!!!!!!!!!!!!!!!!!!!!!!!
export const initGame = (): AppThunk => (dispatch, state) => {
  const order = shuffle(getPlayerIds(state()));
  dispatch(initGameAction({
      ...initialGame,
      currentPlayer: order[0],
      selectedCharacter: {
        characterType: "NULL"
      },
      playerOrder: order
    }
  ));

  dispatch(cursorToCurrentPlayer());
  dispatch(setCurrentPage(IPages.GAME));
};

export const isGameOver = (players: Player.Player[]) =>
  players.filter((player) => !player.dead).length < 2

export const executeCursor = (): AppThunk => (dispatch, state) => {
  const {game: {cursor: {x, y}}} = state();
  const selectedCharacter = getSelectedCharacter(state());
  const currentPlayer = getCurrentPlayer(state());
  const roundType = getRoundType(state());
  if (roundType === RoundTypes.MOVE) {
    const targetCharacter = getFromCoordinate(state(), {row: y, column: x});
    if (isPlayer(targetCharacter) && currentPlayer?.id === targetCharacter.id) {
      dispatch(selectCharacter({id: targetCharacter!.id, characterType: 'PLAYER'}));
    } else {
      if (selectedCharacter) {
        if (targetCharacter) {
          if (selectedCharacter.attackPoints > 0) {
            if (attack(selectedCharacter, targetCharacter)) {
              dispatch(killPlayer(targetCharacter.id));
              dispatch(stepCharacter(selectedCharacter, x, y));
              if (isGameOver(state().players)) {
                dispatch(setCurrentPage(IPages.CONFIG));
              }
            }
            dispatch(removeAttackPoint(selectedCharacter.id));
          }
        } else {
          if (selectedCharacter.movementPoints > 0) {
            dispatch(stepCharacter(selectedCharacter, x, y));
          }
        }
      }
    }
  }
}

export const stepCursorThunk = (x: number, y: number): AppThunk => (dispatch, state) => {
  const {rows, columns} = state().board;
  let newRow = state().game.cursor.y + y;
  newRow = newRow < 0 ? 0 : newRow > rows - 1 ? rows - 1 : newRow;
  let newCol = state().game.cursor.x + x;
  newCol = newCol < 0 ? 0 : newCol > columns - 1 ? columns - 1 : newCol;
  dispatch(stepCursor({x: newCol, y: newRow}))
};

export const stepCursor = createAction<{x: number, y: number}>(actionTypes.STEP_CURSOR)
export const switchRoundType = createAction(actionTypes.SWITCH_ROUND_TYPE)

export const selectSpell = createAction<number>(actionTypes.SELECT_SPELL);


export const selectCharacter = createAction<{ id: string, characterType: CharacterTypes }>(actionTypes.SELECT_CHARACTER)
