import React from 'react'

export const SelectBox = ({label, options}) => {
  return (
    <div className="dropdown">
        <label for="myDropdown">{label}</label>
        <select id="myDropdown">
        {options.map((item,index) => (
            <option value={index+1}>{item}</option>
        ))}
        </select>
    </div>
  )
}
