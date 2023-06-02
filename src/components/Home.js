import React , {useState, useEffect} from 'react'
import {Table} from './Table.js'
import { Button } from './Button.js'
import { SelectBox } from './SelectBox.js'

export const Home = () => {
    const [scenarios, setScenarios] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:3000/scenarios');
            const jsonData = await response.json();
            setScenarios(jsonData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []); // Empty dependency array to run the effect only once

  return (
    <div className="home">
        
        <SelectBox
        label="Scenario"
        options={scenarios.map(scenario => scenario.name)}
        >
        </SelectBox>

        {/* <Table></Table> */}

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
