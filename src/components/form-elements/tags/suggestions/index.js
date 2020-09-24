import React, { useEffect, useRef } from 'react';
import './style.css';

const Suggestions = ({ tags, text, onSelect, coords, clearEverything }) => {
    const thisList = useRef(null);

    useEffect(() => {
        const isClickInside = (e) => {
            if (thisList.current) {
                let inside = thisList.current.contains(e.target);
                if (!inside) clearEverything();
            }
        };

        document.addEventListener('click', (e) => isClickInside(e));
        return () =>
            document.removeEventListener('click', (e) => isClickInside(e));
    }, [clearEverything]);

    if (!tags || !onSelect || !coords) return null;
    const { top, left } = coords;

    const handleSubString = (str) => {
        let search = str.search(text);
        const pos = search > 0 ? search : 0;
        const substr = [pos, pos + text.length];

        return {
            start: str.slice(0, substr[0]),
            highlight: str.slice(substr[0], substr[1]),
            end: str.slice(substr[1], str.length)
        };
    };

    return (
        <div ref={thisList} className="list" style={{ top, left }}>
            {tags.map((tag) => {
                const string = handleSubString(tag.title);
                return (
                    <span onClick={() => onSelect(tag.title)} key={tag.id}>
                        {string.start}
                        <strong>{string.highlight}</strong>
                        {string.end}
                    </span>
                );
            })}
            {text.length && !tags.length ? (
                <span onClick={() => onSelect(text)}> Add tag "{text}" </span>
            ) : null}
        </div>
    );
};

export default Suggestions;
