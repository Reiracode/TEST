import React, { useState, Fragment, useFetch, useEffect } from "react";
import ReactDOM from "react-dom";

// https://wecodetheweb.com/2019/03/02/easy-modals-with-react-hooks/https://wecodetheweb.com/2019/03/02/easy-modals-with-react-hooks/
// https://codeburst.io/reacts-portals-in-3-minutes-9b2efb74e9a9
const HookModal = props => {
const ToggleContent = ({ toggle, content }) => {
    const [isShown, setIsShown] = React.useState(false);
    const hide = () => setIsShown(false);
    const show = () => setIsShown(true);

    return (
        <Fragment>
            {toggle(show)}
            {isShown && content(hide)}
        </Fragment>
    );
}

const Modal = ({ children }) => (
    ReactDOM.createPortal(
        <div className="modal">
            {children}
        </div>,
        document.body
    )
);
    
    return (
        <p>
            Click to reveal a secret:
        
        <ToggleContent
                toggle={show => <button onClick={show}>Open</button>}
                content={hide => (
                    <Modal>
                        There is no spoon.<br />
                        <button onClick={hide}>Close</button>
                    </Modal>
                )}
            />
        </p>
    );
   
}

export default HookModal;