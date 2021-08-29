import {bindActionCreators} from "@reduxjs/toolkit";
import {connect, ConnectedProps} from "react-redux";
import {getPlayerOrder, nextPlayer} from "../../../reducers/game/game.actions";
import {setModal} from "../../../reducers/pageState/pageState.actions";

const mapDispatchToProps = (dispatch: AppDispatch) => bindActionCreators({
  nextPlayer,
  setModal
}, dispatch);

const mapStateToProps = (state: RootState) => ({
  playerOrder: getPlayerOrder(state)
})

const connector = connect(mapStateToProps, mapDispatchToProps);
export type ConnectedContainerProps = ConnectedProps<typeof connector>;
export default connector;