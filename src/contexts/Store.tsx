// import * as React from "react";
// import Store, {IState} from "../reducers";
// import { AnyAction } from "redux";
// import {IActions} from "../actions";

// export interface IStore {
//     state: IState,
//     dispatch(action:IActions):void
// }

// export function createCtx<StateType, ActionType>(
//     reducer: React.Reducer<StateType, ActionType>,
//     initialState: StateType,
// ) {
//     const defaultDispatch: React.Dispatch<ActionType> = () => initialState // we never actually use this
//     const ctx = React.createContext({
//         state: initialState,
//         dispatch: defaultDispatch, // just to mock out the dispatch type and make it not optioanl
//     })
//     function Provider(props: React.PropsWithChildren<{}>) {
//         const [state, dispatch] = React.useReducer<React.Reducer<StateType, ActionType>>(reducer, initialState)
//         return <ctx.Provider value={{ state, dispatch }} {...props} />
//     }
//     return [ctx, Provider] as const
// }
// const initialState = {
//     pageState: {
//         loading: true,
//         serverUrl: "dasd",
//         appName: 'REACT-TS-WEBPACK-BOILERPLATE'
//     },
//     map: {
//         columns:1,
//         rows: 4
//     }
// }

// export const [useCtx,Provider] = createCtx(Store,initialState);

// export const Provider:React.FC = ({children}) => {
//     const [state,dispatch] = React.useReducer(Store,);
//     return (
//         <StoreProvider value={{state,dispatch}}>
//             {children}
//         </StoreProvider>
//     )
// }