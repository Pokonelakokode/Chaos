import * as React from "react";
import { ReactNode} from "react";
import Players from "./Players";
import Cell from "./Cell";
import Cursor from "./Game/Cursor";

interface IProps {
    boardWidth: number
    boardHeight: number
    cellSize: number,
    cursor: {
        x: number,
        y: number
    }
    children: ReactNode
    executeCursor(x:number,y:number):any
    stepCursor(x:number,y:number):any
}

function BoardEngine({cursor,boardWidth,boardHeight,cellSize,children,executeCursor,stepCursor}:IProps){
    const rows:JSX.Element[] = [];
    for (let i = 1; i <= boardHeight; i++) {
        let row = [];
        for (let j = 1; j <= boardWidth; j++) {
            row.push(<Cell cellSize={cellSize} key={j} row={i} col={j}/>)
        }
        rows.push(<div key={i} className="row">{row}</div>)
    }
    return (
        <React.Fragment>
            {rows}
            <Cursor cursor={cursor} cellSize={cellSize} executeCursor={executeCursor} stepCursor={stepCursor}/>
            {children}
        </React.Fragment>
    )
}

type boardWidth = 10;
type boardHeight = 10;
type cellSize = 50;
type cursor = {
    x: 0,
    y: 0
}

BoardEngine.defaultProps = {
    boardWidth: 10,
    boardHeight: 10,
    executeCursor: function(x,y){console.log(x,y)},
    stepCursor: function(x,y){console.log(x,y)},
    cellSize: 50,
    cursor: {
        x: 0,
        y: 0
    }
} as Partial<IProps>;

export default BoardEngine