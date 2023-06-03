import React from 'react';

export const SelectBox = ({ value, label, options, onChange }) => {
  return (
    <div className="dropdown">
      <label htmlFor="myDropdown">{label}</label>
      <select
        id="myDropdown"
        value={value}
        onChange={(e) => onChange(e.target.value, label)}
      >
        {options.map((item, index) => (
          <option key={index} value={label === "Direction" ? item : index + 1}>{item}</option>
        ))}
      </select>
    </div>
  );
};
