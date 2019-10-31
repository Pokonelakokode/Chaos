// import * as React from "react";
// import pageState from "../reducers/pageState";
// import {PageStateActionTypes} from "../actions/pageState";

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
// // usage
// const initialState = {
//     loading: true,
//     serverUrl: "dasd",
//     appName: 'REACT-TS-WEBPACK-BOILERPLATE'
// };
// type AppState = typeof initialState
// type Action =
//     | { type: 'increment' }
//     | { type: 'add'; payload: number }
//     | { type: 'minus'; payload: number }
//     | { type: 'decrement' }

// const [ctx, CountProvider] = createCtx(Store, initialState);
// export const CountContext = ctx;

// // top level example usage
// export function App() {
//     return (
//         <CountProvider>
//             <Counter />
//         </CountProvider>
//     )
// }

// // example usage inside a component
// function Counter() {
//     const { state, dispatch } = React.useContext(CountContext);
//     return (
//         <div>
//             Count: {state.loading}
//     <button onClick={() => dispatch({ type: PageStateActionTypes.SET,path:['loading'],data:false })}>+</button>
//     </div>
// )
// }