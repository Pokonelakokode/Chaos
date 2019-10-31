import pageState, {IPageState} from "./pageState";
import {IBoard, board} from './board';
import {Reducer, combineReducers} from "redux";
import {IActions} from "../actions";
import {IPlayer, players} from "./players";
import {IPageStateActions} from "../actions/pageState";
import {IBoardActions} from "../actions/board";
import {IPlayerActions} from "../actions/player";
import game, {IGame} from "./game";



const Store = combineReducers<IState,IPageStateActions & IBoardActions & IPlayerActions>({
    pageState,
    board,
    players,
    game
});

export type IStore =  Reducer<{
    pageState: IPageState,
    board: IBoard
    player: IPlayer
},IActions>

export interface IState {
    pageState: IPageState,
    board: IBoard
    players: IPlayer[],
    game: IGame
}

export type GetState = () => IState;

export default Store;