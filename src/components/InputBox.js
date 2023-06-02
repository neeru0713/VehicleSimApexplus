import React from 'react';

export const InputBox = ({ label, value, onChange, showError }) => {

  return (
    <div className="input-box">
       
        <label htmlFor="myInput">{label}</label>
        <input 
            type="text"
            id="myInput"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className = {showError ? "red-border" : "white-border"}
        />
         <div className = {showError ? "tooltip" : null}>
          {showError && <div className="error-message">Input cannot be empty</div>}
         </div>
        
        
    </div>
  )
}
