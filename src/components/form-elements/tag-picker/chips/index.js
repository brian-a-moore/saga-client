import React from 'react';
import { MdClose } from 'react-icons/md';
import './style.css';

const Chips = ({ tags, removeTag }) => {
    return(
        <div className='tags-list'>
            { tags.map(tag => (
                <div className='chip' key={tag.id}>
                     <span> {tag.title} </span>
                    <button onClick={() => removeTag(tag)}>
                        <MdClose />
                    </button>           
                </div>
            ))}
        </div>
    )
};

export default Chips;