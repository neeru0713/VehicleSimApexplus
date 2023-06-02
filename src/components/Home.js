import React from 'react'
import {Table} from './Table.js'
import { Button } from './Button.js'

export const Home = () => {
  return (
    <div className="home">
        <div className="scenario-dropdown">
            <label for="myDropdown">Scenario</label>
            <select id="myDropdown">
                <option value="option1">Test Scenario</option>
                <option value="option2">My Scenario</option>
            </select>
        </div>

        <Table></Table>

        <div className="sim-btns">
            <Button
            text="Start Simulation"
            color="green"
            ></Button>

            <Button
            text="Stop Simulation"
            color="blue"
            ></Button>

        </div>

        <div className="sim-container">
            
            {Array.from({ length: 84 }, (_, index) => index).map((val) => (
                <div class="box"></div>
            ))}
            
        </div>

    </div>
  )
}
