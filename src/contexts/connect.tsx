// import * as React from "react";

// import {StoreContext} from "./Store";
// import {IState} from "../reducers";

// export type MapStateToProps = (state: IState) => any;
// export type MapDispatchToProps = (dispatch: React.Dispatch<any>) => any
// const connect = (mapState:MapStateToProps, mapDispatch:MapDispatchToProps) => {
//     return (WrappedComponent:React.FC<any>) => {
//         return () => {
//             const { state, dispatch } = React.useContext(StoreContext);
//             return (
//                 <WrappedComponent {...mapState(state)} {...mapDispatch(dispatch)} />
//             );
//         };
//     };
// };

// export default connect