import * as React from 'react';
import {PlayerTypes} from "../../../reducers/players/players.reducer";
import {useEffect} from "react";
import connector, {ConnectedContainerProps} from "./Player.connector";

type Props = ConnectedContainerProps & Player.Player

const Player:React.FC<Props> = ({dead, id,col,row,playerType,name, cellSize, onTurn, selected, selectCharacter}) => {
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
    if (dead) {
        return null
    }
    return (
        <div
            className={`player${onTurn ? ' onturn' : ''}${selected ? ' selected' : ''}`}
            key={name}
            onClick={() => selectCharacter({characterType: "PLAYER", id})}
            id={`player-${name}`}
            style={{
                backgroundImage: `url(${PlayerTypes[playerType].img})`,
                top,
                left
            }}
        />
    )
};

export default connector(Player)