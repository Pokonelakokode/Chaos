import {getBoard} from "../reducers/board/board.actions";
import {positions} from "../reducers/board/board.reducer";
import {getPlayersLength, PlayerActions} from "../reducers/players/player.actions";
import {initGame} from "../reducers/game/game.actions";

export const startGame = (): AppThunk => (dispatch, getState) => {
  const {columns, rows} = getBoard(getState());
  const playerLength = getPlayersLength(getState());
  const playerPositions = positions(rows,columns, playerLength)
  dispatch(PlayerActions.initPlayers(playerPositions));
  dispatch(initGame());
};
