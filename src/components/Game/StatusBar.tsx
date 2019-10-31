import * as React from "react";
import {IPlayer} from "../../reducers/players";
import {IGame} from "../../reducers/game";
import { connect } from "react-redux";
import {nextPlayer} from "../../actions/game";
import {resetMovementPoints} from "../../actions/player";
import {endGame, setModal} from "../../actions/pageState";
import SpellBook from "./SpellBook";

interface IProps {
    player: IPlayer[],
    game: IGame
}

interface DispatchToProps {
    nextPlayer:nextPlayer,
    resetMovementPoints():void
    endGame: endGame,
    setModal: setModal
}

const StatusBarComponent: React.FC<IProps & DispatchToProps> = ({player,game,nextPlayer,resetMovementPoints,endGame,setModal}) => {
    const _nextPlayer = () => {
        if(game.currentPlayer === game.playerOrder.length - 1){
            resetMovementPoints();
        }
        nextPlayer();
    };
    const button = game.playerOrder.length > 1 ?
        <button onClick={_nextPlayer}>Next</button> :
        <button onClick={endGame}>End Game</button>;
    return (
        <div id="Status-bar">
            <button onClick={() => {setModal(<SpellBook/>)}}>Spell Book</button>
            {game.playerOrder.reduce((acc:JSX.Element[],id,index) => {
                acc.push(<p key={id} className={index === game.currentPlayer ? 'selected' : ''}>
                    {player[id].name}
                </p>);
                return acc
            },[])}
            {button}
        </div>
    )
};

const StatusBar = connect(null,{nextPlayer,resetMovementPoints,endGame,setModal})(StatusBarComponent);

export default StatusBar