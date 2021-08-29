import * as React from "react";
import Cell from "./Cell";

interface IProps {
    board: Board.Store
    setLoaded(loaded:boolean):void;
    cellSize: number
}


const Board: React.FC<IProps> = (props) => {
    const rows:JSX.Element[] = [];
    React.useEffect(() => {
        props.setLoaded(true);
    },[]);
    for (let i = 1; i <= props.board.rows; i++) {
        const row = [];
        for (let j = 1; j <= props.board.columns; j++) {
            row.push(<Cell cellSize={props.cellSize} key={j} row={i} col={j}/>)
        }
        rows.push(<div key={i} className="row">{row}</div>)
    }
    return (
        <React.Fragment>
            {rows}
        </React.Fragment>
    )
};

export default Board