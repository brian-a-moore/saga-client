import React from 'react';
import './style.css';

/*
    Used to view dialogs in an overlay
*/

const Modal = (props) => {
    return (
        <div className="modal">
            <div className="container">{props.children}</div>
        </div>
    );
};

export default Modal;
