import {setIn} from 'immutable'
import {IPageStateActions, PageStateActionTypes} from "../actions/pageState";
import { Reducer } from 'redux';
import {serverUrl} from "../index";

export enum IPages {
    config = 'CONFIG',
    game = 'GAME'
}

export const initialPageState:IPageState = {
    serverUrl: serverUrl,
    loading: true,
    cellSize: 50,
    appName: 'Chaos',
    page: IPages.config,
    modalOpen: false
};

const pageState = (state = initialPageState,action:IPageStateActions):IPageState => {
    switch(action.type){
        case PageStateActionTypes.SET:
            return setIn(state,action.path,action.data);
        case PageStateActionTypes.SET_MODAL:
            return {...state,modalOpen: true, modalContent: action.content};
        default:
            return state
    }
};

export interface IPageState {
    [key: string]: any,
    serverUrl: string,
    cellSize: number,
    loading: boolean,
    appName: string,
    page: IPages,
    modalOpen: boolean,
    modalContent?: JSX.Element
}



export default pageState