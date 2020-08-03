import React, { useState } from 'react';
import { MdCheck } from 'react-icons/md';
import './style.css';

const CheckBox = ({ title, value, defaultValue, onChange }) => {
    const [ check, setCheck ] = useState(value || defaultValue);
    const handleChange = () => {
        setCheck(!check);
        onChange(!check);
    }
    return(
        <div className='checkbox-container'>
            <label>
                <div className='box'> { value ? <MdCheck /> : null } </div>
                <span> {title} </span>
                <input type='checkbox' value={check} onChange={handleChange} />
            </label>
        </div>
    );
};

export default CheckBox;