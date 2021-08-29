import * as React from "react";
import {useCallback, useEffect} from "react";

interface IProps {
    actions: {
        executeCursor(x:number,y:number): void,
        stepCursor(x:number,y: number): void
    }
    data: {
        cursor: ICursor,
        cellSize: number,
        boardWidth: number
        boardHeight: number
    }
}


function Cursor({data, actions} :IProps){
    const top = data.cursor.y! * data.cellSize;
    const left = data.cursor.x! * data.cellSize;
    const keyListener = useCallback((e:KeyboardEvent) => {
        switch (e.key) {
            case 'q':
                return actions.stepCursor(-1,-1);
            case 'w':
                return actions.stepCursor(0,-1);
            case 'e':
                return actions.stepCursor(1,-1);
            case 'a':
                return actions.stepCursor(-1,0);
            case 'd':
                return actions.stepCursor(1,0);
            case 'z':
                return actions.stepCursor(-1,1);
            case 'y':
                return actions.stepCursor(-1,1);
            case 'x':
                return actions.stepCursor(0,1);
            case 'c':
                return actions.stepCursor(1,1);
            case 's':
                return actions.executeCursor(data.cursor.x,data.cursor.y);
            default:
                return null
        }
    }, [actions.stepCursor]);

    useEffect(() => {
        window.addEventListener('keydown',keyListener);
    },[keyListener]);
    return (
        <div id="Cursor" style={{
            top,
            left
        }}>

        </div>
    )
}

export default Cursor