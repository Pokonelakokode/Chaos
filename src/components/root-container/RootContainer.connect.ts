import {bindActionCreators} from "@reduxjs/toolkit";
import {executeCursor, getCursor, stepCursorThunk} from "../../reducers/game/game.actions";
import {getCurrentPage, isModalOpen} from "../../reducers/pageState/pageState.actions";
import {connect, ConnectedProps} from "react-redux";
import {getBoard} from "../../reducers/board/board.actions";

const mapDispatchToProps = (dispatch: AppDispatch) => bindActionCreators({
  stepCursor: stepCursorThunk,
  executeCursor
}, dispatch);

const mapStateToProps = (state: RootState) => ({
  page: getCurrentPage(state),
  cursor: getCursor(state),
  modalOpen: isModalOpen(state),
  board: getBoard(state)
})

const connector = connect(mapStateToProps, mapDispatchToProps);
export type ConnectedRootContainerProps = ConnectedProps<typeof connector>;
export default connector;