import React, {useEffect, useState} from 'react'
import { SelectBox } from './SelectBox'
import { InputBox } from './InputBox';
import {Button} from './Button';

export const AddVehicle = () => {

  const [data, setData] = useState([]);
  const [scenario, setScenario] = useState("1");
  const [vehicleName, setVehicleName] = useState('');
  const [speed, setSpeed] = useState('');
  const [posX, setPosX] = useState('');
  const [posY, setPosY] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [direction, setDirection] = useState('Towards');
  const directions = ["Towards", "Backwards", "Downwards", "Upwards"]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/scenarios');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once


  async function onValChange(val, inp){

    if(inp === 'Vehicle Name'){
      setVehicleName(val);
    }

    if(inp === 'Speed'){
      setSpeed(val);
    }

    if(inp === 'Position X'){
      setPosX(val);
    }

    if(inp === 'Position Y'){
      setPosY(val);
    }

  }

  const setBtnClicked = (btn) => {
    if(btn === 'Add'){

      let url = "http://localhost:3000/vehicles";
      const newVehicleData = {
        name: vehicleName,
        posx: posX,
        posy: posY,
        speed: speed,
        direction: direction,
        scenarioId: scenario,
      };

      console.log(newVehicleData);

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if required
        },
        body: JSON.stringify(newVehicleData), // Convert the data to JSON string
      })
        .then(response => response.json())
        .then(data => {
          alert('Vehicle added successfully')
        })
        .catch(error => {
          alert(error)
        });
        
      }

      if(btn === 'Reset'){
        setScenario('')
        setVehicleName('')
        setSpeed('')
        setPosX('')
        setPosY('')
        setDirection('')
        setShowErrors(false)
      }  
  }

  const onDropdownChange = (val, label) => {
    console.log(val, label)
    if(label === "Scenario List"){
      setScenario(val)
    }

    if(label === "Direction"){
      setDirection(val)
    }
  }

  return (
    <div className='add-vehicle'>
      <p>Vehicle / add</p>
      <h2>Add Vehicle</h2>
      <div className="add-vehicle-box">


        <div style={{display: 'flex', justifyContent: 'space-around', paddingTop: '50px'}}>

          <SelectBox
          value={scenario}
          label="Scenario List"
          options={data.map(scenario => scenario.name)}
          onChange={onDropdownChange}
          ></SelectBox>

          <InputBox
          label="Vehicle Name"
          value={vehicleName}
          onChange={onValChange}
          ></InputBox>

          <InputBox
          label="Speed"
          value={speed}
          onChange={onValChange}
          ></InputBox>

        </div>

        <div style={{display: 'flex', justifyContent: 'space-around',  paddingTop: '40px'}}>

          <InputBox
          label="Position X"
          value={posX}
          onChange={onValChange}
          ></InputBox>

          <InputBox
          label="Position Y"
          value={posY}
          onChange={onValChange}
          ></InputBox>

          <SelectBox
          value={direction}
          label="Direction"
          options={directions}
          onChange={onDropdownChange}
          ></SelectBox>

        </div>

      </div>
      <div className="add-scenario-btns">
        <Button
        text="Add"
        color="green"
        setBtnClicked={setBtnClicked}
        ></Button>

        <Button
        text="Reset"
        color="orange"
        setBtnClicked={setBtnClicked}
        ></Button>

        <Button
        text="Go Back"
        color="blue"
        link="/"
        ></Button>

        </div>
    </div>
  )
}
