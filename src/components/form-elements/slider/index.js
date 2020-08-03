import React, { useState } from 'react';
import './style.css';

const Slider = ({ value, defaultValue, onChange }) => {
    const [ pct, setPct ] = useState(value.toString() || defaultValue.toString());
    const handleChange = e => {
        let value = parseInt(e.target.value);
        setPct(value.toString());
        onChange(value);
    }
    return(
        <div className='slider-container'>
            <div className='pct-container'>
                {pct}%
            </div>
            <input className='slider' type='range' value={pct}  min='1' max='100' onChange={handleChange} />
        </div>
    )
};

export default Slider;