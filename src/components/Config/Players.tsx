import * as React from "react";
import {PlayerTypes} from "../../reducers/players/players.reducer";
import {useDispatch, useSelector} from "react-redux";
import {getPlayers, PlayerActions} from "../../reducers/players/player.actions";

const Players: React.FC = () => {
  const players = useSelector(getPlayers);
  const dispatch = useDispatch()
  return (
    <div className="player">
      {players.map((player, id) => (
        <div key={id}>
          <input
            value={player.name}
            placeholder="Enter name"
            onChange={(e) => {
              dispatch(PlayerActions.setPlayer({path: [id, 'name'], data: e.target.value}))
            }}
          />
          <div className="delete" onClick={() => {
            players.length > 2 ? dispatch(PlayerActions.removePlayer(player.id)) : alert('You must have at least 2 players')
          }}>X
          </div>
          <select value={player.playerType} onChange={(e) => {
            dispatch(PlayerActions.setPlayer({path: [id, 'playerType'], data: e.target.value}))
          }}>
            {Object.keys(PlayerTypes).map(key => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  )
};

export default Players;