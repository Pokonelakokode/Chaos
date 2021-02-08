import * as React from "react";
import {useEffect} from "react";
import {ICursor} from "../../reducers/game";

interface IProps {
    cursor: ICursor,
    cellSize: number,
    executeCursor(x:number,y:number): void,
    stepCursor(x:number,y: number): void
}

function Cursor({cursor: {y,x},cellSize,stepCursor,executeCursor}:IProps){
    const top = y! * cellSize;
    const left = x! * cellSize;
    useEffect(() => {
        const keyListener = (e:KeyboardEvent) => {
            switch (e.key) {
                case 'q':
                    return stepCursor(-1,-1);
                case 'w':
                    return stepCursor(-1,0);
                case 'e':
                    return stepCursor(-1,1);
                case 'a':
                    return stepCursor(0,-1);
                case 'd':
                    return stepCursor(0,1);
                case 'z':
                    return stepCursor(1,-1);
                case 'y':
                    return stepCursor(1,-1);
                case 'x':
                    return stepCursor(1,0);
                case 'c':
                    return stepCursor(1,1);
                case 's':
                    return executeCursor(x,y);
                default:
                    return null
            }
        };
        window.addEventListener('keydown',keyListener);
        return () => window.removeEventListener("keydown",keyListener);
    },[]);
    return (
        <div id="Cursor" style={{
            top,
            left
        }}>

        </div>
    )
};


export default Cursor