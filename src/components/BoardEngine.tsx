import * as React from "react";
import {ReactNode, useMemo} from "react";
import Cell from "./Cell";
import Cursor from "./Game/cursor/Cursor";

interface IProps {
  actions: {
    executeCursor(x: number, y: number): any
    stepCursor(x: number, y: number): any
  };
  data: {
    boardWidth: number
    boardHeight: number
    cellSize: number,
    cursor: {
      x: number,
      y: number
    }
  };
  children: ReactNode
}

function BoardEngine({data, actions, children}: IProps) {
  const renderRows = useMemo(() => {
    const rows: JSX.Element[] = [];
    for (let i = 1; i <= data.boardHeight; i++) {
      const row: JSX.Element[] = [];
      for (let j = 1; j <= data.boardWidth; j++) {
        row.push(<Cell cellSize={data.cellSize} key={j} row={i} col={j}/>)
      }
      rows.push(<div key={i} className="row">{row}</div>)
    }
    return rows;
  }, [data.boardWidth, data.boardHeight])
  return (
    <React.Fragment>
      {renderRows}
      <Cursor data={{
        cursor: data.cursor,
        cellSize: data.cellSize,
        boardHeight: data.boardHeight,
        boardWidth: data.boardWidth
      }} actions={{
        executeCursor: actions.executeCursor,
        stepCursor: actions.stepCursor
      }}/>
      {children}
    </React.Fragment>
  )
}

export default BoardEngine