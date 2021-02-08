import * as React from 'react';
import {PlayerTypes, IPlayer} from "../reducers/players";
import {useEffect} from "react";
import {GameActions} from "../actions/game";

interface IProps extends IPlayer {
    cellSize: number
    onTurn: boolean
    selected: boolean
    selectCharacter():GameActions['SELECT_CHARACTER'] | void
}

const Player:React.FC<IProps> = ({cellSize,col,row,playerType,onTurn,selectCharacter,selected,name}) => {
    const top = row! * cellSize;
    const left = col! * cellSize;
    useEffect(() => {
        const el = document.getElementById(`player-${name}`);
        let pos = 0;
        let direction = 'forward';
        const animate = setInterval(() => {
            if(PlayerTypes[playerType].loop){
                direction = pos === cellSize * PlayerTypes[playerType].frames ? 'backward' : direction;
                direction = pos === 0 ? 'forward' : direction;
                pos = direction === 'forward' ? pos + 50 : pos - 50;
            }
            else {
                pos = pos === cellSize * PlayerTypes[playerType].frames ? 0 : pos + 50;
            }

            el!.style.backgroundPositionX = pos + 'px';
        },PlayerTypes[playerType].speed);
        return () => clearInterval(animate)
    },[]);
    return (
        <div
            className={`player${onTurn ? ' onturn' : ''}${selected ? ' selected' : ''}`}
            key={name}
            onClick={selectCharacter}
            id={`player-${name}`}
            style={{
                backgroundImage: `url(${PlayerTypes[playerType].img})`,
                top,
                left
            }}
        />
    )
};

export default Player