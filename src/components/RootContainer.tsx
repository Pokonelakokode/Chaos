import * as React from "react";
import {useState, Fragment} from "react";
import {IState} from "../reducers";
import {Dispatch} from "../actions";
import {connect} from "react-redux";
import Board from "./Board";
import {IBoard} from "../reducers/board";
import Players from "./Players";
import {IPlayer} from "../reducers/players";
import {IPages} from "../reducers/pageState";
import {Config} from "./Config";
import StatusBar from "./Game/StatusBar";
import {IGame} from "../reducers/game";
import Modal from "./Modal";
import {closeModal} from "../actions/pageState";
import Cursor from "./Game/Cursor";
import {stepCursor} from "../actions/game";

interface IProps {
}

interface StateToProps {
    board: IBoard
    players: IPlayer[],
    cellSize: number,
    page: IPages,
    game: IGame,
    modalOpen: boolean,
    modalContent?: JSX.Element,
}

interface DispatchToProps {
    closeModal: closeModal,
    stepCursor(row:number,col:number): any
}


const RootComponent: React.FC<IProps & StateToProps & DispatchToProps> = ({board, players, cellSize, page, game,modalOpen,modalContent,closeModal,stepCursor}) => {
    const [loaded, setLoaded] = useState(false);
    let content;
    switch (page) {
        case IPages.config:
            content = <Config board={board} players={players}/>;
            break;
        case IPages.game:
            content = (
                <div id="board">
                    <Board cellSize={cellSize} board={board} setLoaded={setLoaded}/>

                    {loaded && <Players
                        currentPlayer={game.playerOrder[game.currentPlayer]}
                        playerOrder={game.playerOrder}
                        players={players}
                        cellSize={cellSize}
                        roundType={game.roundType}
                        selectedCharacter={game.selectedCharacter}
                    />}
                    {loaded && <Cursor stepCursor={stepCursor} cursor={game.cursor} cellSize={cellSize}/>}
                    <StatusBar player={players} game={game}/>
                </div>
            );
            break;
    }
    return (<Fragment>
        {content}
        {modalOpen && modalContent && <Modal closeModal={closeModal} open={modalOpen}>
            {modalContent}
        </Modal>}
    </Fragment>)
};

const states = (state: IState) => ({
    board: state.board,
    players: state.players,
    cellSize: state.pageState.cellSize,
    page: state.pageState.page,
    game: state.game,
    modalOpen: state.pageState.modalOpen,
    modalContent: state.pageState.modalContent
});


const actions = (dispatch: Dispatch) => ({});


export const RootContainer = connect(states, {closeModal,stepCursor})(RootComponent);