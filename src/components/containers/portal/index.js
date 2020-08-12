import { useEffect } from 'react';
import { createPortal } from 'react-dom';

/*
    Used to display pop-ups outside of the React tree
*/

const root = document.getElementById('app-root');

const Portal = ({ children, mode, theme }) => {
    const el = document.createElement('div');
    useEffect(() => {
        root.appendChild(el);
        return () => root.removeChild(el);
    }, [ el ]);

    return createPortal(children, el);
};

export default Portal;