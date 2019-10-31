import {IPages} from "../reducers/pageState";

export enum PageStateActionTypes {
    SET = 'PAGE_STATE.SET',
    SET_MODAL = 'PAGE_STATE.SET_MODAL'
}

export type PageStateActions = {
    SET: {
        type: typeof PageStateActionTypes.SET,
        path: string[],
        data: any
    },
    SET_MODAL: {
        type: typeof PageStateActionTypes.SET_MODAL,
        content: JSX.Element
    }
}
export type setModal = (content:JSX.Element) => void
export const setModal:setModal = (content) => ({type: PageStateActionTypes.SET_MODAL,content});

export type closeModal = () => void
export const closeModal:closeModal = () => ({type:PageStateActionTypes.SET,path: ['modalOpen'],data: false});

export type endGame = () => void
export const endGame:endGame = () => ({type: PageStateActionTypes.SET,path:['page'],data: IPages.config});


export type IPageStateActions = PageStateActions[keyof  PageStateActions]