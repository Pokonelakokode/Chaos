import * as React from 'react';
import Player from './Game/player/Player';
import {useSelector} from 'react-redux';
import {getAlivePlayers} from "../reducers/players/player.actions";

const Players:React.FC = () => {
    const players = useSelector(getAlivePlayers);
    return (
        <React.Fragment>
            {players.map(player =>
                <Player
                  key={player.id}
                  {...player}
                />
            )}
        </React.Fragment>
    )
};

export default Players