import * as React from "react";
import {PlayerTypes, IPlayer} from "../../reducers/players";
import {useEffect} from "react";
import {saveState} from "../../index";

interface IProps {
    players: IPlayer[]
    setPlayer(path:(string|number)[],data:any): void,
    removePlayer(index:number): void
}

const Players:React.FC<IProps> = (props) => {
    useEffect(() => {
        saveState();
    });
    const players = props.players.map((player,id) => (
        <div key={id}>
            <input
                value={player.name}
                placeholder="Enter name"
                onChange={(e) => {props.setPlayer([id,'name'],e.target.value)}}
            />
            <div className="delete" onClick={() => {players.length > 2 ? props.removePlayer(id) : alert('You must have at least 2 players')}}>X</div>
            <select value={player.playerType} onChange={(e) => {props.setPlayer([id,'playerType'],e.target.value)}}>
                {Object.keys(PlayerTypes).map(key => (
                    <option key={key} value={key}>{key}</option>
                ))}
            </select>
        </div>
    ));
    return (
        <div className="player">
            {players}
        </div>
    )
};

export default Players;