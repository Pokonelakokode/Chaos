import * as React from "react";
import {connect} from "react-redux";
import {IState} from "../reducers";
import {IPlayerTypes, IPlayer, initialStats, initialPlayer} from "../reducers/players";
import {IBoard} from "../reducers/board";
import {addPlayer, initPlayers, removePlayer, setPlayer, shufflePlayers} from "../actions/player";
import Players from "./Config/Players";
import { ThunkDispatch } from "redux-thunk";
import {IActions} from "../actions";
import {initGame} from "../actions/game";
import {setBoard} from "../actions/board";
import {playersValid} from "../utils";

interface IProps {
    players: IPlayer[],
    board: IBoard,
}

interface DispatchProps {
    addPlayer: typeof addPlayer
    setPlayer(path:string[],data:any): void,
    removePlayer(index:number): void
    initPlayers(): void
    initGame(): void
    shufflePlayers(): void,
    setBoard(path:string[],data:any): void
}

interface StateProps {

}

const ConfigComponent:React.FC<IProps & DispatchProps> = ({addPlayer,initPlayers,initGame,setPlayer,removePlayer,board,players,setBoard}) => {
    const _addPlayer = () => addPlayer({...initialPlayer});
    const startGame = () => {
        if(playersValid(players,"name")){
            initPlayers();
            initGame();
        }
        else {
            alert('All the player names have to be uniq')
        }

    };
    return (
        <div id="config">
            <h1>CHAOS</h1>
            <Players players={players} setPlayer={setPlayer} removePlayer={removePlayer}/>
            <button onClick={_addPlayer}>ADD PLAYER</button>
            <button onClick={shufflePlayers}>SHUFFLE</button>
            <button onClick={startGame}>PLAY</button>
            <div id="BoardConfig">
                <label>Rows </label>
                <input value={board.rows} type="number" onChange={(e) => {setBoard(['rows'],e.target.value)}}/>
                <label>Columns </label>
                <input value={board.columns} type="number" onChange={(e) => {setBoard(['columns'],e.target.value)}}/>
            </div>
        </div>
    )
};

const states = (state:IState) => ({

});

const actions = (dispatch:ThunkDispatch<{},{},IActions>) => ({
    // addPlayer: (player:IPlayer) => dispatch({type:PlayerActionTypes.ADD,player}),
    // setPlayer: (path:string[],data:any) => dispatch({type:PlayerActionTypes.SET,path,data}),
    // removePlayer: (index:number) => dispatch({type:PlayerActionTypes.REMOVE,index}),
    // ...bindActionCreators({initPlayers},dispatch)
});

export const Config = connect(null,{addPlayer,setPlayer,removePlayer,initPlayers,initGame,shufflePlayers,setBoard})(ConfigComponent);