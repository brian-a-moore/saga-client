import React, { useState } from 'react';
// import { ChromePicker } from 'react-color';
import { fonts, textures, ratings } from '../../../data';
import './style.css';

const EntryEditor = (props) => {
    const [backgroundColor, setBackgroundColor] = useState(null);
    const [rating, setRating] = useState(4);
    const [texture, setTexture] = useState(null);
    const [fontFamily, setFontFamily] = useState(null);
    const [color, setColor] = useState(null);
    return (
        <div className="editor entry-editor">
            <div className="row padded">
                <div className="col-8 padded">
                    <label> Title </label>
                    <input type="text" />
                    <div className="row">
                        <div className="col-6" style={{ paddingRight: '4px' }}>
                            <label>Mood</label>
                            <select>
                                <option>Option</option>
                            </select>
                        </div>
                        <div className="col-6" style={{ paddingLeft: '4px' }}>
                            <label>Rating</label>
                            <select
                                defaultValue={rating}
                                onChange={(e) => setRating(e.target.value)}
                            >
                                {ratings.map((d, i) => (
                                    <option value={d.level}>{d.title} </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <label> Body </label>
                    <textarea />
                </div>
                <div className="col-4 padded">
                    <label> Texture </label>
                    <select onChange={(e) => setTexture(e.target.value)}>
                        <option value={null}> None </option>
                        {textures.map((d, i) => (
                            <option key={d[0]} value={d[0]}>
                                {d[1]}{' '}
                            </option>
                        ))}
                    </select>
                    <label> Background Color </label>
                    {/* <ChromePicker color={backgroundColor || '#000'} onChangeComplete={({ hex }) => setBackgroundColor(hex)} /> */}
                    <label> Font </label>
                    <select onChange={(e) => setFontFamily(e.target.value)}>
                        <option value={null}> Default </option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Trebuchet MS">Trebuchet MS</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Comic Sans MS">Comic Sans MS</option>
                        {fonts.map((d, i) => (
                            <option key={d[0]} value={d[1]}>
                                {d[1]}{' '}
                            </option>
                        ))}
                    </select>
                    <label> Font Color </label>
                    {/* <input type='color' onChange={e => setColor(e.target.value)} /> */}
                    <label> Sample </label>
                    <div
                        className="sample"
                        style={{
                            backgroundColor,
                            backgroundImage:
                                texture && texture !== 'None'
                                    ? `url(${require('../../static/textures/' +
                                          texture +
                                          '.png')})`
                                    : null,
                            color,
                            fontFamily
                        }}
                    >
                        <span>AaBbCc 123456</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EntryEditor;
