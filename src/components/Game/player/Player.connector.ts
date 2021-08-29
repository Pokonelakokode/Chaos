import {bindActionCreators} from "@reduxjs/toolkit";
import {connect, ConnectedProps} from "react-redux";
import {getCellSize} from "../../../reducers/board/board.actions";
import {isPlayerOnTurn, isPlayerSelected, selectCharacter} from "../../../reducers/game/game.actions";

const mapDispatchToProps = (dispatch: AppDispatch) => bindActionCreators({
  selectCharacter
}, dispatch);

const mapStateToProps = (state: RootState, props: Player.Player) => ({
  cellSize: getCellSize(state),
  onTurn: isPlayerOnTurn(state, props.id),
  selected: isPlayerSelected(state, props.id),
})

const connector = connect(mapStateToProps, mapDispatchToProps);
export type ConnectedContainerProps = ConnectedProps<typeof connector>;
export default connector;