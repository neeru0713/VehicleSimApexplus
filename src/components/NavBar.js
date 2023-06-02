import { Link } from "react-router-dom";
import React, { useState } from 'react';

function NavBar(){
    const [clickedBtn, setClickedBtn] = useState('Home')

    async function btnHandler(eve){
        setClickedBtn(eve.target.innerText)
    }
    return(
        <ul className="list">
            <div onClick={btnHandler} className={clickedBtn === 'Home' ? "highlight" : null} ><Link to="/" className="link"> <li>Home</li> </Link></div>
            <div onClick={btnHandler} className={clickedBtn === 'Add Scenario' ? "highlight" : null}><Link to="/addscenario" className="link"> <li>Add Scenario</li> </Link> </div>
            <div onClick={btnHandler} className={clickedBtn === 'All Scenario' ? "highlight" : null}><Link to="/allscenario" className="link"> <li>All Scenario</li> </Link> </div>
            <div onClick={btnHandler} className={clickedBtn === 'Add Vehicle' ? "highlight" : null}><Link to="/addvehicle" className="link"> <li>Add Vehicle</li> </Link> </div>
        </ul>
    )
}

export default NavBar

