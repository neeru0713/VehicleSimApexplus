import React from 'react'
import { Link } from "react-router-dom";

export const Button = ({text, color, setBtnClicked}) => {
    const handleClick = (e) => {
        setBtnClicked(e.target.innerText)
    }
    return (
        <div className="my-btn">
            {
                
            text === 'Go Back' 
            
            ? 
            
            <Link to="/"><button
            className={`${color}-btn`}
            >{text}</button> </Link>

            : 

            <button
            onClick={handleClick}
            className={`${color}-btn`}
            >{text}</button>}
            
        </div>
    )
}
