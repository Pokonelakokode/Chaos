import { createAction, createSelector} from "@reduxjs/toolkit";
import * as actionTypes from "./board.actionTypes";

export const setBoard = createAction<{path: string[], data: any}>(actionTypes.SET);
export const getColumns = (state: RootState) => state.board.columns;
export const getRows = (state: RootState) => state.board.rows;
export const getCellSize = (state: RootState) => state.board.cellSize;
export const getBoard = createSelector([getColumns, getRows, getCellSize], (columns, rows, cellSize) => ({columns, rows, cellSize}))


export default {
    setBoard,
    getColumns,
    getRows,
    getBoard
}
