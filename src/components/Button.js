import React from 'react'
import { Link } from "react-router-dom";

export const Button = ({text, color, setBtnClicked, link}) => {
    const handleClick = (e) => {
        setBtnClicked(e.target.innerText)
    }
    return (
        <div className="my-btn">
            
            {
                
            link 
            
            ? 
            
            <Link to={link}><button
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
