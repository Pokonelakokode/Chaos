import {BoardActionTypes,IBoardActions} from "../actions/board";
import { setIn } from "immutable";

export interface IBoard {
    rows: number,
    columns: number
}

export const positions = (rows:number,columns:number,playerNumber:number):{row:number,column:number}[] => {
    rows = rows - 1;
    columns = columns - 1;

    switch (playerNumber) {
        case 2:
            return [
                {row: Math.floor(rows / 2),column: 0},
                {row: Math.floor(rows / 2),column: columns},
            ];
        case 3:
            return [
                {row: 0,column: 0},
                {row: 0,column: columns},
                {row: rows,column: Math.floor(columns / 2)},
            ];
        case 4:
            return [
                {row: 0, column: 0},
                {row: 0, column: columns},
                {row: rows, column: 0},
                {row: rows, column: columns},
            ];
        case 5:
            return [
                {row: 0, column: 0},
                {row: 0, column: columns},
                {row: rows, column: 0},
                {row: rows, column: columns},
                {row: 0, column: Math.floor(columns/2)}
            ];
        case 6:
            return [
                {row: 0, column: 0},
                {row: 0, column: columns},
                {row: rows, column: 0},
                {row: rows, column: columns},
                {row: 0, column: Math.floor(columns/2)},
                {row: Math.floor(rows/2), column: Math.floor(columns/2)}
            ];
        default:
            return [
                {row: 0, column: 0},
                {row: 0, column: columns},
                {row: rows, column: 0},
                {row: rows, column: columns},
                {row: 0, column: Math.floor(columns/2)},
                {row: Math.floor(rows/2), column: Math.floor(columns/2)}
            ]


    }
};

export const initialBoard = {
    rows: 5,
    columns: 7
};

export const board = (state = initialBoard, action:IBoardActions):IBoard => {
    switch (action.type){
        case BoardActionTypes.SET:
            return setIn(state,action.path,action.data);
        default:
            return state
    }
};