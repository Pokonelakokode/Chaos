import {initialPageState, pageStateReducer} from "./pageState/pageState.reducer";
import {boardReducer, initialBoard} from './board/board.reducer';
import {combineReducers, Middleware} from "redux";
import {initialGame} from "./game/game.types";
import {gameReducer} from "./game/game.reducer";
import {initialPlayers, playerReducer} from "./players/players.reducer";
import {configureStore} from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    pageState: pageStateReducer,
    game: gameReducer,
    board: boardReducer,
    players: playerReducer
})

const initialState: RootState = {
    board: initialBoard,
    game: initialGame,
    pageState: initialPageState,
    players: initialPlayers,
};


export const loadCache = (): RootState => {
    const savedBoard = window.localStorage.getItem("Chaos");
    if (savedBoard) {
        try {
            return {
                ...JSON.parse(savedBoard),
                pageState: {
                    ...initialPageState
                }
            }
        } catch (e) {
            return initialState;
        }
    } else {
        return initialState;
    }
};

export const saveLocalStorage: Middleware<
  {},
  RootState
  > = storeApi => next => action => {
    next(action);
    const state = storeApi.getState() // correctly typed as RootState
    localStorage.setItem('Chaos', JSON.stringify(state));
}

export const store = configureStore({
    devTools:
      process.env.NODE_ENV === "production"
        ? false
        : { trace: true, traceLimit: 25 },
    reducer: rootReducer,
    preloadedState: loadCache(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(saveLocalStorage)
})
