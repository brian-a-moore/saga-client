import React, { useState } from 'react';
import './style.css';

/*
USE CASE:
    <Slider
        value={textureOpacity}
        defaultValue={textureOpacity}
        onChange={setTextureOpacity}
        range={[0, 100]}
        step={1}
        />
*/

const Slider = ({ value, defaultValue, onChange, range, step }) => {
    const [pct, setPct] = useState(value.toString() || defaultValue.toString());
    const handleChange = (e) => {
        let value = parseInt(e.target.value);
        setPct(value.toString());
        onChange(value);
    };
    return (
        <div className="slider-container">
            <div className="pct-container">{pct}%</div>
            <input
                className="slider"
                type="range"
                value={pct}
                step={step || '1'}
                min={range ? range[0] : '0'}
                max={range ? range[1] : '100'}
                onChange={handleChange}
            />
        </div>
    );
};

export default Slider;
