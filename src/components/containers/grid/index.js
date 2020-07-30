import React, { useRef, useEffect } from 'react';
import './style.css';

/*
    Used to display image/title pairs in pop-up menus.
*/

const Grid = ({ items, type, onSelect, setOpen, coords }) => {
    const thisGrid = useRef(null);

    useEffect(() => {
        const isClickInside = e => {
            if(thisGrid.current) {
                let inside = thisGrid.current.contains(e.target);
                if(!inside) setOpen(false);
            }
        };

        document.addEventListener('click', e => isClickInside(e));
        return () => document.removeEventListener('click', e => isClickInside(e));
    }, [ setOpen ]);

    if(!items || !type || !onSelect || !coords) return null;
    const { top, left } = coords;

    return(
        <div ref={thisGrid} className='grid' style={{ top, left }}>
            { items.map((d, i) => (
                <Item item={d} key={d.id} type={type} onSelect={onSelect} setOpen={setOpen} />
            )) }
        </div>
    );
};

const Item = ({ item, type, onSelect, setOpen }) => {
    const imageRenderer = () => {
        switch(type) {
            case 'font': return <span className='font-text' style={{ fontFamily: item.title }}> Aa </span>;
            case 'mood':
            case 'texture': return item.id !== 'none' ? <img src={ require(`../../../static/${type}s/${item.raw.toLowerCase()}.png`) } alt={item.title} /> : null;
            default: return null;
        }
    }
    const handler = item => {
        onSelect(item);
        setOpen();
    }
    return(
        <div className='grid-item' onClick={() => handler(item)}>
            <div className='img-container' alt={item.title}>
                {imageRenderer()}
            </div>
            <span className='title'> { item.title } </span>
        </div>
    );
};

export default Grid;