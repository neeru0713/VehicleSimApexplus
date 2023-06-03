import React, { useState } from 'react';

export const InputBox = ({ label, value, onChange, showError }) => {
  const [error, setError] = useState('Value cannot be empty')
  const [showErr, setShowErr] = useState(false)
  const handleChange = (e) => {
    let val = e.target.value
    if(val === ''){
      setShowErr(true)
    }
    if(label === 'Position X'){
      if(!isNaN(val)){
        setShowErr(true)
        setError("Value cannot be empty")
      }
    }
    onChange(val, label)
  }

  return (
    <div className="input-box">
       
        <label htmlFor="myInput">{label}</label>
        <input 
            type="text"
            id="myInput"
            value={value}
            onChange={handleChange}
            className = {showError ? "red-border" : "white-border"}
        />
         <div className = {showError ? "tooltip" : null}>
          {showError && <div className="error-message">Input cannot be empty</div>}
         </div>
        
        
    </div>
  )
}
