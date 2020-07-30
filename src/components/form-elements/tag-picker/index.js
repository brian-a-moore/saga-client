import React, { useState, useEffect, useRef } from 'react';
import List from '../../repeaters/list';
import './style.css';

const TagPicker = ({ type, defaultValue, data, onSelect }) => {
    const [ selection, setSelection ] = useState(defaultValue || null);
    const [ open, setOpen ] = useState(false);
    const [ coords, setCoords ] = useState(null);
    const [ selectedTags, setSelectedTags ] = useState([]);
    const thisPicker = useRef(null);

    const getCoordinates = ({ current }) => { 
        if(current) {
            const rect = current.getBoundingClientRect();
            setCoords({
                left: rect.x,
                top: rect.y + window.scrollY + 40
            });
        }
    }

    useEffect(() => {
        if(open) getCoordinates(thisPicker);
    }, [ open ]);

    useEffect(() => {
        window.addEventListener('resize', () => getCoordinates(thisPicker));
        return () => window.removeEventListener('resize', () => getCoordinates(thisPicker));
    }, []);

    return(
        <div className='tag-picker' ref={thisPicker}>
            <div className='selected-tags'>
                {selectedTags.map((d, i) => (
                    <Tag tag={d} key={d.id} />
                ))}
            </div>
            { open ? 
                <Portal>
                    <List items={data} type={type} onSelect={trigger} setOpen={setOpen} coords={coords} />
                </Portal>
            : null }
        </div>
    );
};

const Tag = props => {
    return(
        <div className='tag'>

        </div>
    );
};

export default TagPicker;