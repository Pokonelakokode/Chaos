import {createSlice} from "@reduxjs/toolkit";
import {assocPath} from "ramda";
import {PageStateActions} from "../actions/pageState";

export enum IPages {
    config = "CONFIG",
    game = "GAME",
}

export enum PageStateActionTypes {
    SET = "SET",
    SET_MODAL = "SET_MODAL",
}

export const initialPageState: PageState.Store = {
    appName: "Chaos",
    cellSize: 50,
    loading: true,
    modalOpen: false,
    page: IPages.config,
};

const pageState = createSlice({
    name: "pageState",
    initialState: initialPageState,
    reducers: {
        [PageStateActionTypes.SET]: (state, action: PageState.Actions.SET) => {
            return assocPath(action.payload.path, action.payload.data, state);
        },
        [PageStateActionTypes.SET_MODAL]: (state, action: PageState.Actions.SET_MODAL) => {
            return {...state, modalOpen: true, modalContent: action.payload};
        },
    },

});

export default pageState;
