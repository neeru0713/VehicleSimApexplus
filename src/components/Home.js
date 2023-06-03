import React , {useState, useEffect} from 'react'
import {Table} from './Table.js'
import { Button } from './Button.js'
import { SelectBox } from './SelectBox.js'

export const Home = () => {
    const [scenarios, setScenarios] = useState([]);
    const [scenario, setScenario] = useState("1");
    const [vehicles, setVehicles] = useState([])

    const headerData = ["Vehicle Id", "Vehicle Name", "Position X", "Position Y", "Speed", "Direction"]


    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/scenarios');
        const jsonData = await response.json();
        setScenarios(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const handleDelete = async (id) => {
      try {
        await fetch(`http://localhost:3000/vehicles/${id}`, {
          method: 'DELETE',
        });
        getVehiclesByScenario(scenario); // Fetch the updated data after deletion
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    };

    const deleteScenario = async (id) => {
      handleDelete(id)
    }

    useEffect(() => {
        
        fetchData();
        getVehiclesByScenario("1");
      }, []); // Empty dependency array to run the effect only once

      // Function to get all vehicles for a scenario
      const getVehiclesByScenario = async (scenario) => {
        try {
          const response = await fetch(`http://localhost:3000/vehicles?scenarioId=${scenario}`);
          if (response.ok) {
            const vehicles = await response.json();
            setVehicles(vehicles);
          } else {
            throw new Error('Failed to retrieve vehicles');
          }
        } catch (error) {
          console.error('Error retrieving vehicles:', error);
        }
      };

      const onDropdownChange = (val, label) => {
        
        if(label === 'Scenario'){
          setScenario(val)
          // get all vehicles for this scenario
          getVehiclesByScenario(val);
        }
      }

  return (
    <div className="home">
        
        <SelectBox
        value={scenario}
        label="Scenario"
        options={scenarios.map(scenario => scenario.name)}
        onChange={onDropdownChange}
        >
        </SelectBox>

        <Table
        headerData={headerData}
        tableData={vehicles}
        tableName="vehicles"
        handleDelete={deleteScenario}
        ></Table>

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
