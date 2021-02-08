import * as React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {RootContainer} from "./components/RootContainer";
import Store, {IState} from "./reducers";
import {initialBoard} from "./reducers/board";
import {initialGame} from "./reducers/game";
import {initialPageState} from "./reducers/pageState";
import {initialPlayers} from "./reducers/players";
import "./styles.scss";

export let serverUrl = window.location.href.replace(window.location.hash, "").replace(window.location.search, "");

const initialState: IState = {
    board: initialBoard,
    game: initialGame,
    pageState: initialPageState,
    players: initialPlayers,
};

const loadCache = (): IState => {
    const savedBoard = window.localStorage.getItem("chaos");
    if (savedBoard) {
        try {
            return JSON.parse(savedBoard);
        } catch (e) {
            return initialState;
        }
    } else {
        return initialState;
    }
};
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })
    || compose;
export const store = createStore(Store, loadCache(), composeEnhancers(applyMiddleware(thunk)));

export const saveState = () => {
    const state = store.getState();
    window.localStorage.setItem("chaos", JSON.stringify(state));
};

render(
    <Provider store={store}>
        <RootContainer/>
    </Provider>,
    document.getElementById("app"),
);
