import * as React from "react";
import Players from "./Players";
import {playersValid} from "../../utils";
import {addPlayerId, initialPlayer} from "../../reducers/players/players.reducer";
import connector, {ConnectedContainerProps} from "./Config.connector";

const ConfigComponent: React.FC<ConnectedContainerProps> = ({board, shufflePlayers, players, addPlayer, startGame, setBoard}) => {
  const initGame = () => {
    if (playersValid(players, "name")) {
      startGame()
    } else {
      alert('All the player names have to be uniq')
    }
  };
  return (
    <div id="config">
      <h1>CHAOS</h1>
      <Players/>
      <button onClick={() => addPlayer(addPlayerId({...initialPlayer}))}>
        ADD PLAYER
      </button>
      <button onClick={shufflePlayers}>SHUFFLE</button>
      <button onClick={initGame}>PLAY</button>
      <div id="BoardConfig">
        <label>Rows </label>
        <input value={board.rows} type="number" onChange={(e) => setBoard({
          path: ['rows'],
          data: e.target.value
        })}/>
        <label>Columns </label>
        <input value={board.columns} type="number"
               onChange={(e) => setBoard({path: ['columns'], data: e.target.value})}/>
      </div>
    </div>
  )
};

export default connector(ConfigComponent);