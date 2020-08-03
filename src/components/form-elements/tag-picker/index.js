import React, { useState, useEffect, useRef, useCallback } from 'react';
import Portal from '../../containers/portal';
import List from '../../repeaters/list';
import { MdClose } from 'react-icons/md';
import './style.css';

const TagPicker = ({ value, defaultValue, tags, updateTags }) => {
    const thisPicker = useRef(null);
    const thisInput = useRef(null);

    // Typed text / Filtered List
    const [ text, setText ] = useState('');
    const [ filteredList, setFilteredList ] = useState([]);
    
    useEffect(() => {
        if(text.length) {
            setOpen(true);
            let list = [];
            for(let x in tags) {
                if(tags[x].title.toLowerCase().includes(text.toLowerCase())) list.push(tags[x]);
            }
            setFilteredList(list);
        } else {
            setOpen(false);
            setFilteredList([])
        }
    }, [ tags, text ]);

    // Managing Tags
    const [ selectedTags, setSelectedTags ] = useState(value || defaultValue);

    const getIds = useCallback(() => {
        let ids = [];
        for(let x in selectedTags) {
            ids.push(selectedTags[x].id);
        }

        return ids;
    }, [ selectedTags ]);

    const addTag = useCallback(tag => {
        let ids = getIds();
        if(!ids.includes(tag.id)) setSelectedTags([ ...selectedTags, tag ]);
    }, [ selectedTags, getIds ]);

    const removeTag = tag => {
        let ids = getIds();
        if(ids.includes(tag.id)) setSelectedTags([ ...selectedTags].filter(t => (t.id !== tag.id)));
    }

    useEffect(() => {
        updateTags(selectedTags);
    }, [ updateTags, selectedTags ]);

    // Toggling dropdown menu
    const [ open, setOpen ] = useState(false);

    useEffect(() => {
        if(open) getCoordinates(thisPicker);
    }, [ open ]);

    // Handling Coordinates
    const [ coords, setCoords ] = useState(null);

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
        window.addEventListener('resize', () => getCoordinates(thisPicker));
        return () => window.removeEventListener('resize', () => getCoordinates(thisPicker));
    }, []);

    // Handle Enter
    const handleEnter = useCallback(e =>  {
        if(e.keyCode === 13 && text) {
            if(filteredList.length) addTag(filteredList[0]);
            else addTag({
                id: Math.random(),
                title: text
            });
            setText('');
            setOpen(false);
        }
    }, [ addTag, text, filteredList ]);

    useEffect(() => {
        let el = thisInput.current;
        el.addEventListener('keyup', e => handleEnter(e));
        return () => el.removeEventListener('keyup', e => handleEnter(e));
    }, [ handleEnter ]);

    return(
        <div className='tag-picker' ref={thisPicker}>
            <input type='text' value={text} onChange={e => setText(e.target.value)} ref={thisInput} />
            <div className='selected-tags'>
                {selectedTags.map(tag => (
                    <Tag tag={tag} key={tag.id} removeTag={removeTag} />
                ))}
            </div>
            { open ? 
                <Portal>
                    <List text={text} items={filteredList} onSelect={addTag} setOpen={setOpen} coords={coords} />
                </Portal>
            : null }
        </div>
    );
};

const Tag = ({ tag, removeTag }) => {
    return(
        <div className='tag'>
            <span> {tag.title} </span>
            <button onClick={() => removeTag(tag)}>
                <MdClose />
            </button>
        </div>
    );
};

export default TagPicker;