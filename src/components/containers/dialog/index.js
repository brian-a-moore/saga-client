import React from 'react';
import './style.css';

/*
    Display dialogs in modal
*/

const Dialog = ({ header, children, actions }) => {
    const {
        cancelAction,
        cancelText,
        confirmAction,
        confirmText,
        data
    } = actions;
    return (
        <div className="dialog">
            <h1> {header} </h1>
            {children}
            <div className="actions">
                <button onClick={cancelAction}>
                    {' '}
                    {cancelText || 'Cancel'}{' '}
                </button>
                {confirmAction ? (
                    <button onClick={() => confirmAction(data || null)}>
                        {' '}
                        {confirmText || 'Okay'}{' '}
                    </button>
                ) : null}
            </div>
        </div>
    );
};

export default Dialog;
