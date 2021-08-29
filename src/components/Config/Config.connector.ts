import {bindActionCreators} from "@reduxjs/toolkit";
import {connect, ConnectedProps} from "react-redux";
import {addPlayer, getPlayers, shufflePlayers} from "../../reducers/players/player.actions";
import {startGame} from "../../actions/common";
import {getBoard, setBoard} from "../../reducers/board/board.actions";

const mapDispatchToProps = (dispatch: AppDispatch) => bindActionCreators({
  shufflePlayers,
  addPlayer,
  startGame,
  setBoard
}, dispatch);

const mapStateToProps = (state: RootState) => ({
  board: getBoard(state),
  players: getPlayers(state)
})

const connector = connect(mapStateToProps, mapDispatchToProps);
export type ConnectedContainerProps = ConnectedProps<typeof connector>;
export default connector;