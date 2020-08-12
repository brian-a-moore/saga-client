import React, { useState, useEffect, useRef, useCallback } from 'react';
import Portal from '../../containers/portal';
import Chips from './chips';
import Suggestions from './suggestions';
import './style.css';

const TagPicker = ({ defaultTags, availableTags }) => {
    const thisPicker = useRef(null);
    const thisInput = useRef(null);

    // Text
    const [ text, setText ] = useState('');

    // Selected Tags
    const [ selectedTags, setSelectedTags ] = useState(defaultTags || []);
    const [ tempId, setTempId ] = useState(-1);

    const addTag = useCallback(tag => {
        let text = typeof tag === 'object' ? tag.title : tag;
        const filteredAvailableTags = availableTags.reduce((acc, tag) => {
            if(tag.title.toLowerCase().includes(text)) acc.push(tag);
            return acc;
        }, []);
        const filteredSelectedTags = selectedTags.reduce((acc, tag) => {
            if(tag.title.toLowerCase().includes(text)) acc.push(tag);
            return acc;
        }, []);

        if(!filteredAvailableTags.length && !filteredSelectedTags.length) {
            setSelectedTags([ ...selectedTags, { id: tempId, title: text }]);
            setTempId(tempId - 1);
        }
        if (filteredAvailableTags.length && !filteredSelectedTags.length) {
            setSelectedTags([ ...selectedTags, filteredAvailableTags[0] ]);
        }
        clearEverything();
    }, [ availableTags, selectedTags, tempId, setTempId ]);

    const removeTag = tag => {
        const newTags = selectedTags.filter(t => (t.id !== tag.id));
        setSelectedTags(newTags);
    }

    //Handle Enter
    const handleEnter = e =>  {
        if(e.keyCode === 13 || e.which === 13) addTag(thisInput.current.value);
    };

    // Filtered Tag List
    const [ filteredTags, setFilteredTags ] = useState([]);

    useEffect(() => {
        const titles = [];
        for(let x in selectedTags) titles.push(selectedTags[x].title.toLowerCase());
        const preFilteredTags = availableTags.filter(tag => (!titles.includes(tag.title.toLowerCase())));

        if(text.length) {
            let matchingTags = preFilteredTags.filter(tag => (
                tag.title.toLowerCase().includes(text.toLowerCase())
            ));
            setFilteredTags(matchingTags);
        } else setFilteredTags([]);
    }, [ text, availableTags, selectedTags ]);

    useEffect(() => {
        if(filteredTags.length) getCoordinates(thisInput);
    }, [ filteredTags ])

    // Handling Coordinates
    const [ coords, setCoords ] = useState(null);

    const getCoordinates = ({ current }) => { 
        if(current) {
            const rect = current.getBoundingClientRect();
            setCoords({ left: rect.x, top: rect.y + window.scrollY + 40
            });
        }
    }
    useEffect(() => {
        window.addEventListener('resize', () => getCoordinates(thisPicker));
        return () => window.removeEventListener('resize', () => getCoordinates(thisPicker));
    }, []);

    // Clear Everything
    const clearEverything = () => {
        setText('');
        setFilteredTags([]);
    }

    return(
        <div className='tag-picker' ref={thisPicker}>
            <input
                type='text'
                ref={thisInput}
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyPress={e => handleEnter(e)}
                placeholder='Type a tag...' />
            <Chips tags={selectedTags} removeTag={removeTag} />
            <Portal>
                <Suggestions
                    coords={coords}
                    tags={filteredTags}
                    text={text}
                    onSelect={addTag}
                    clearEverything={clearEverything} />
            </Portal>
        </div>
    );
};

export default TagPicker;