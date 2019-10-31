import * as React from "react";

interface IProps {
    row: number,
    col: number,
    cellSize: number
}

const Cell:React.FC<IProps> = (props) => {

    return (
        <div className={`cell`} style={{width:props.cellSize,height: props.cellSize}} id={props.row + '-' + props.col}>

        </div>
    )
}

export default Cell