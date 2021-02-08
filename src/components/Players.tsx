import * as React from 'react';
import {IPlayer} from '../reducers/players';
import Player from './Player';
import {connect} from 'react-redux';
import {selectCharacter} from "../actions/game";
import game, {CharacterTypes, ISelectedCharacter, RoundTypes} from "../reducers/game";
import {playerOrder, stepPlayer} from "../actions/player";
import {setModal} from "../actions/pageState";

interface IProps {
    players: IPlayer[],
    cellSize: number,
    currentPlayer: string,
    selectedCharacter: ISelectedCharacter,
    playerOrder: ReturnType<typeof playerOrder>
}

interface DispatchToProps {
    selectCharacter: typeof selectCharacter,
    stepPlayer:stepPlayer,
    setModal: setModal
}

const PlayersComponent:React.FC<IProps & DispatchToProps> = ({players,currentPlayer,cellSize,selectCharacter,selectedCharacter,stepPlayer,playerOrder,setModal}) => {
    const playerComp = players.reduce((acc:JSX.Element[],player) => {
        if(player.dead) return acc;
        const selected = selectedCharacter.name === player.name && selectedCharacter.characterType === CharacterTypes.PLAYER;
        const onTurn = player.name === currentPlayer;
        const _selectCharacter = () => onTurn && playerOrder.getGameStatus().roundType === RoundTypes.MOVE ?
            selectCharacter(player.name,CharacterTypes.PLAYER) :
            setModal(<div>{Object.keys(player.stats!).map(stat => <p key={stat}>{`${stat}: ${player.stats![stat]}`}</p>)}</div>);
        acc.push(<Player selected={selected} selectCharacter={_selectCharacter} onTurn={onTurn} {...player} cellSize={cellSize} key={player.name}/>);
        return acc
    },[]);
    // useEffect(() => {
    //     const keyListener = (e:KeyboardEvent) => {
    //         switch (e.key) {
    //             case 'q':
    //                 return stepPlayer(-1,-1);
    //             case 'w':
    //                 return stepPlayer(-1,0);
    //             case 'e':
    //                 return stepPlayer(-1,1);
    //             case 'a':
    //                 return stepPlayer(0,-1);
    //             case 'd':
    //                 return stepPlayer(0,1);
    //             case 'z':
    //                 return stepPlayer(1,-1);
    //             case 'x':
    //                 return stepPlayer(1,0);
    //             case 'c':
    //                 return stepPlayer(1,1);
    //         }
    //     };
    //     window.addEventListener('keydown',keyListener);
    //     return () => window.removeEventListener("keydown",keyListener);
    // },[]);

    return (
        <React.Fragment>
            {playerComp}
        </React.Fragment>
    )
};

const Players = connect(null,{selectCharacter,stepPlayer,setModal})(PlayersComponent);

export default Players