import * as React from "react";
import {closeModal} from "../actions/pageState";

interface IProps {
    open: boolean
    closeModal: closeModal
}

const Modal: React.FC<IProps> = ({children,closeModal}) => {
    return (
        <div id="Modal">
            <div id="ModalContent">
                {children}
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    )
};

export default Modal