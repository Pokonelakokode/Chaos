import * as React from 'react';
import "./styles.scss";
import {render} from 'react-dom';
import {RootContainer} from './components/RootContainer';
import {applyMiddleware, createStore} from 'redux';
import Store, {IState} from "./reducers";
import {Provider} from 'react-redux';
import {initialPlayers} from "./reducers/players";
import {initialPageState} from "./reducers/pageState";
import thunk from "redux-thunk";
import {initialGame} from "./reducers/game";
import {initialBoard} from "./reducers/board";

export let serverUrl = window.location.href.replace(window.location.hash, '').replace(window.location.search, '');

let initialState:IState = {
    pageState: initialPageState,
    players: initialPlayers,
    board: initialBoard,
    game: initialGame,
};

const loadCache = ():IState => {
    const savedBoard = window.localStorage.getItem('chaos');
    if(savedBoard){
        try {
            return JSON.parse(savedBoard)
        }
        catch (e) {
            return initialState
        }
    }
    else {
        return initialState;
    }
};

export const store = createStore(Store,loadCache(),applyMiddleware(thunk));

export const saveState = () => {
    const state = store.getState();
    window.localStorage.setItem('chaos',JSON.stringify(state))
};

render(
    <Provider store={store}>
        <RootContainer/>
    </Provider>,
    document.getElementById('app'),
);