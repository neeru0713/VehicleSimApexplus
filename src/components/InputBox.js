import React, { useState } from 'react';

export const InputBox = ({ label, value, onChange }) => {
  const [error, setError] = useState('Value cannot be empty')
  const [showErr, setShowErr] = useState(false)


  const handleChange = (e) => {

    debugger
    let val = e.target.value

    if(val === ''){
      setShowErr(true)
      setError("Value cannot be empty")
    } else if(label === 'Position X' || label === 'Position Y'){
      let inpval = parseInt(val)
      
      if(isNaN(inpval)){
        setShowErr(true)
        setError("position must be a number")
      } else {
        if(val < 0 || val > 800){
          setShowErr(true)
          setError(`${label} should not be > 800 or < 0`)
        } else {
          if(val < 0 || val > 800){
            setShowErr(true)
            setError(`${label} should not be > 800 or < 0`)
          } else{
            setShowErr(false)
          }
        }
      }
        
    } else {
      setShowErr(false)
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
            className = {showErr ? "red-border" : "white-border"}
        />
         <div className = {showErr ? "tooltip" : null}>
          {showErr && <div className="error-message">{error}</div>}
         </div>
        
        
    </div>
  )
}
