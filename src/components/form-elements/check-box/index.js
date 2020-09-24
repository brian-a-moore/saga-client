import React, { useState } from "react";
import { MdCheck } from "react-icons/md";
import "./style.css";

/*
USE CASE:
    <CheckBox
        title="Set as Default"
        value={isDefault}
        defaultValue={isDefault}
        onChange={setIsDefault}
        />
*/

const CheckBox = ({ title, value, defaultValue, onChange }) => {
  const [check, setCheck] = useState(value || defaultValue);
  const handleChange = () => {
    setCheck(!check);
    onChange(!check);
  };
  return (
    <div className="checkbox-container">
      <label>
        <div className="box"> {value ? <MdCheck /> : null} </div>
        <span> {title} </span>
        <input type="checkbox" value={check} onChange={handleChange} />
      </label>
    </div>
  );
};

export default CheckBox;
