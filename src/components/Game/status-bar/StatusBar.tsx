import * as React from "react";
import connector, {ConnectedContainerProps} from "./StatusBar.connector";
import {IModalContent} from "../../../reducers/pageState/pageState.types";


const StatusBarComponent: React.FC<ConnectedContainerProps> = ({nextPlayer, setModal}) => {
    // const button = playerOrder!.getPlayers().filter(player => !player.dead).length > 1 ?
    //     <button onClick={_nextPlayer}>Next</button> :
    //     <button onClick={endGame}>End Game</button>;
    return (
        <div id="Status-bar">
            <button onClick={() => {setModal(IModalContent.SPELL_BOOK)}}>Spell Book</button>
            <button onClick={() => nextPlayer()}>Next Player</button>
            {/*{game.playerOrder!.getPlayers().map()}*/}
            {/*{game.playerOrder.reduce((acc:JSX.Element[],id,index) => {*/}
            {/*    acc.push(<p key={id} className={index === game.currentPlayer ? 'selected' : ''}>*/}
            {/*        {player[id].name}*/}
            {/*    </p>);*/}
            {/*    return acc*/}
            {/*},[])}*/}
        </div>
    )
};



export default connector(StatusBarComponent)