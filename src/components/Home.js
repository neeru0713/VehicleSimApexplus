import React , {useState, useEffect} from 'react'
import {Table} from './Table.js'
import { Button } from './Button.js'
import { SelectBox } from './SelectBox.js'

export const Home = () => {
    const [scenarios, setScenarios] = useState([]);
    const [scenario, setScenario] = useState("1");
    const [scenarioData, setScenarioData] = useState({});
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

      const updateVehicle = async (vehicleId, vehicleName, posx, posy, speed, direction ) => {
        try {
          let body = {
            name: vehicleName,
            posx: posx,
            posy: posy,
            speed: speed,
            direction: direction,
            scenarioId: scenario,
          }
          const response = await fetch(`http://localhost:3000/vehicles/${vehicleId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          });
      
          if (response.ok) {
            console.log('Scenario updated successfully');
            fetchData();
            getVehiclesByScenario(scenario);
          } else {
            console.error('Failed to update scenario');
          }
        } catch (error) {
          console.error('Error updating scenario:', error);
        }
      };

      function getRandomColor() {
        // Define the minimum brightness level (0-255)
        const minBrightness = 100;
      
        // Generate random values for red, green, and blue channels
        let red, green, blue;
        do {
          red = Math.floor(Math.random() * 256);
          green = Math.floor(Math.random() * 256);
          blue = Math.floor(Math.random() * 256);
        } while ((red + green + blue) / 3 < minBrightness);
      
        // Create the color string in hexadecimal format
        const color = `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
      
        return color;
      }

      function moveDiv(direction, distance, vehicleDiv) { 
        let translateX = 0;
        let translateY = 0;

        switch (direction) {
          case 'Towards':
            translateX = distance;
            break;
          case 'Backwards':
            translateX = -distance;
            break;
          case 'Upwards':
            translateY = -distance;
            break;
          case 'Downwards':
            translateY = distance;
            break;
        }

        vehicleDiv.style.transform = `translate(${translateX}px, ${translateY}px)`;
      }

        // Example: Move the div 100 pixels to the right after 2 seconds
        

        const setBtnClicked = async (val) => {
          
          
          try {
            const response = await fetch(`http://localhost:3000/scenarios/${parseInt(scenario)}`);
            if (response.ok) {
              const scenario = await response.json();
              setScenarioData(scenario);

              vehicles.forEach((vehicle, index) => {
                
                let vehicleDiv = document.querySelectorAll('.vehicle')[index];
                
                moveDiv(vehicle.direction, vehicle.speed * parseInt(scenario.time.split()[0]), vehicleDiv);
                
              })

            } 
          } catch (error) {
            console.error('Error retrieving vehicles:', error);
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
        updateHandler={updateVehicle}
        ></Table>

        <div className="sim-btns">
            <Button
            text="Start Simulation"
            color="green"
            setBtnClicked = {setBtnClicked}
            ></Button>

            <Button
            text="Stop Simulation"
            color="blue"
            ></Button>

        </div>

        <div className="sim-container">
          {vehicles.map((vehicle, index) => (
            <div className="vehicle" style={{left: parseInt(vehicle.posx), bottom: parseInt(vehicle.posy), background: getRandomColor()}}> {vehicle.id} </div>
          ))}
            
            
            {Array.from({ length: 84 }, (_, index) => index).map((val) => (
                <div class="box"></div>
            ))}
            
        </div>

    </div>
  )
}
