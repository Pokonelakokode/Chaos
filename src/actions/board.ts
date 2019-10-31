export enum BoardActionTypes {
    SET = 'BOARD.SET',
    ADD_ROW = 'BOARD.ADD_ROW',
    ADD_COLUMN = 'BOARD.ADD_COLUMN'
}

type BoardActions = {
    ADD_ROW: {
        type: typeof BoardActionTypes.ADD_ROW
    }
    ADD_COLUMN: {
        type: typeof BoardActionTypes.ADD_COLUMN
    }
    SET : {
        type: typeof BoardActionTypes.SET,
        path: string[],
        data: any
    }
}

export const setBoard = (path:string[],data:any) => ({type: BoardActionTypes.SET,path,data});

export type IBoardActions = BoardActions[keyof BoardActions]