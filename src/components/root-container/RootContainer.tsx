import * as React from "react";
import {useMemo} from "react";
import Players from "../Players";
import Config from "../Config/Config";
import StatusBar from "../Game/status-bar/StatusBar";
import Modal from "../modal/Modal";
import BoardEngine from "../BoardEngine";
import {IPages} from "../../reducers/pageState/pageState.types";
import connector, {ConnectedRootContainerProps} from "./RootContainer.connect";

const RootComponent: React.FC<ConnectedRootContainerProps> = ({cursor,stepCursor,executeCursor,board,page,modalOpen}) => {
  const {columns, rows, cellSize} = board;
  const content = useMemo(() => {
    switch (page) {
      case IPages.CONFIG:
        return <Config/>;
      case IPages.GAME:
        return (
          <div id="board">
            <BoardEngine
              data={{
                boardWidth: columns,
                boardHeight: rows,
                cursor,
                cellSize
              }}
              actions={{
                stepCursor,
                executeCursor
              }}
            >
              <Players/>
            </BoardEngine>
            <StatusBar />
          </div>
        );
    }

  }, [page, columns, rows, cursor, cellSize, stepCursor, executeCursor])
  return (<div>
    {content}
    {modalOpen  && <Modal>
      {}
    </Modal>}
  </div>)
};

export default connector(RootComponent);
