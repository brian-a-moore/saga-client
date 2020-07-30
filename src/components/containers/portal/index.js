import { useEffect } from 'react';
import { createPortal } from 'react-dom';

/*
    Used to display pop-ups outside of the React tree
*/

const Portal = ({ children }) => {
    const mount = document.body;
    const el = document.createElement('div');

    useEffect(() => {
        mount.appendChild(el);
        return () => mount.removeChild(el);
    }, [ el, mount ]);

    return createPortal(children, el);
};

export default Portal;