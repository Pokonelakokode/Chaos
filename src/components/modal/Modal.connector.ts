import {bindActionCreators} from "@reduxjs/toolkit";
import {connect, ConnectedProps} from "react-redux";
import {closeModal} from "../../reducers/pageState/pageState.actions";

const mapDispatchToProps = (dispatch: AppDispatch) => bindActionCreators({
  closeModal
}, dispatch);

const mapStateToProps = (state: RootState) => ({
  open: state.pageState.modalOpen,
  modalContent: state.pageState.modalContent
})

const connector = connect(mapStateToProps, mapDispatchToProps);
export type ConnectedContainerProps = ConnectedProps<typeof connector>;
export default connector;