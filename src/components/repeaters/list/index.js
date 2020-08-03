import React, { useEffect, useRef } from 'react';
import './style.css';

const List = ({ items, text, onSelect, setOpen, coords }) => {
    const thisList = useRef(null);

    useEffect(() => {
        const isClickInside = e => {
            if(thisList.current) {
                let inside = thisList.current.contains(e.target);
                if(!inside) setOpen(false);
            }
        };

        document.addEventListener('click', e => isClickInside(e));
        return () => document.removeEventListener('click', e => isClickInside(e));
    }, [ setOpen ]);

    if(!items || !onSelect || !coords) return null;
    const { top, left } = coords;

    const handleSubString = str => {
        let search = str.search(text);
        const pos = search > 0 ? search : 0;
        const substr = [ pos, pos + text.length ];

        return {
            start: str.slice(0, substr[0]),
            highlight: str.slice(substr[0], substr[1]),
            end: str.slice(substr[1], str.length)
        } 
    }

    const handleClick = item => {
        onSelect(item);
        setOpen(false);
    }

    return(
        <div ref={thisList} className='list' style={{ top, left }}>
            {items.map(item => {
                const string = handleSubString(item.title);
            return(
                <span onClick={() => handleClick(item)} key={item.id}> 
                    {string.start}<strong>{string.highlight}</strong>{string.end}
                </span>
            );
            })}
            {text.length && !items.length ? <span> Add tag "{text}" </span> : null }
        </div>
    );
};

export default List;