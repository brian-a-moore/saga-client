import React from 'react';
import { MdClose } from 'react-icons/md';
import './style.css';

/*
USE CASE:
const fakeTags = [
  { id: 1, title: "One" },
  { id: 2, title: "Two" },
  { id: 3, title: "Three" },
  { id: 4, title: "Four" },
  { id: 5, title: "Five" },
];

    <Chips tags={fakeTags} />
*/

const Chips = ({ tags, removeTag }) => {
    return (
        <div className="tags-list">
            {tags.map((tag) => (
                <div className="chip" key={tag.id}>
                    <span> {tag.title} </span>
                    {removeTag ? (
                        <button onClick={() => removeTag(tag)}>
                            <MdClose />
                        </button>
                    ) : null}
                </div>
            ))}
        </div>
    );
};

export default Chips;
