import {createAction} from "@reduxjs/toolkit";
import {IModalContent, IPages} from "./pageState.types";
import * as actionTypes from './pageState.actionTypes';

export interface PageStateActions {
    SET: {
        type: typeof actionTypes.SET;
        path: string[];
        data: any;
    };
    SET_MODAL: {
        type: typeof actionTypes.SET_MODAL;
        content: JSX.Element;
    };
}


export const getCurrentPage = (state: RootState) => state.pageState.page;
export const isModalOpen = (state: RootState) => state.pageState.modalOpen;

export const setPageState = createAction<PathSetter<any>>(actionTypes.SET)
export const setCurrentPage = createAction<IPages>(actionTypes.SET_PAGE);
export const setModal = createAction<IModalContent>(actionTypes.SET_MODAL)

export const closeModal = createAction(actionTypes.CLOSE_MODAL)
