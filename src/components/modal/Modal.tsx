import * as React from "react";
import connector, {ConnectedContainerProps} from "./Modal.connector";
import {useMemo} from "react";
import {IModalContent} from "../../reducers/pageState/pageState.types";
import SpellBook from "../Game/spell-book/SpellBook";


const Modal: React.FC<ConnectedContainerProps> = ({closeModal, open, modalContent}) => {
  const content = useMemo(() => {
    switch (modalContent) {
      case IModalContent.SPELL_BOOK:
        return <SpellBook/>
      default:
        return null
    }
  }, [modalContent])
  return open ? (
    <div id="Modal">
      <div id="ModalContent">
        {content}
        <button onClick={() => closeModal()}>Close</button>
      </div>
    </div>
  ) : null
};

export default connector(Modal)