import {createSlice} from "@reduxjs/toolkit";
import {assocPath} from "ramda";
import {closeModal, setCurrentPage, setModal, setPageState} from "./pageState.actions";
import {IModalContent, IPages} from "./pageState.types";


export enum PageStateActionTypes {
    SET = "SET",
    SET_MODAL = "SET_MODAL",
}

export const initialPageState: PageState.Store = {
    appName: "Chaos",
    cellSize: 50,
    loading: true,
    modalOpen: false,
    page: IPages.CONFIG,
    modalContent: IModalContent.NULL
};

const pageState = createSlice({
    name: "pageState",
    initialState: initialPageState,
    extraReducers: builder => {
        builder.addCase(setCurrentPage, (state, action) => ({
            ...state,
            page: action.payload
        }))
        builder.addCase(setModal, (state, action) => ({
            ...state,
            modalOpen: true,
            modalContent: action.payload
        }))
        builder.addCase(closeModal, state => ({
            ...state,
            modalOpen: false
        }))
        builder.addCase(setPageState, (state, action) =>
          assocPath(action.payload.path, action.payload.data, state)
        )
    },
    reducers: {},

});

export const pageStateReducer = pageState.reducer;
export const pageStateActions = pageState.actions;

export default pageState;
