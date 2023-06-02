import React, {useEffect, useState} from 'react'
import { SelectBox } from './SelectBox'
import { InputBox } from './InputBox';
import {Button} from './Button';

export const AddVehicle = () => {

  const [data, setData] = useState([]);
  const [scenario, setScenario] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [showErrorVehicleName,setShowErrorVehicleName] = useState(false);
  const [speed, setSpeed] = useState('');
  const [showErrorSpeed, setShowErrorSpeed] = useState(false);
  const [posX, setPosX] = useState('');
  const [showErrorPosX, setShowErrorPosX] = useState(false);
  const [posY, setPosY] = useState('');
  const [showErrorPosY, setShowErrorPosY] = useState(false);
  const [direction, setDirection] = useState('');
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
      if(val === ''){
        setShowErrorVehicleName(true)
      } else {
        setShowErrorVehicleName(false)
      }
      setVehicleName(val);
    }

    if(inp === 'Speed'){
      if(val === ''){
        setShowErrorSpeed(true)
      } else {
        setShowErrorSpeed(false)
      }
      setSpeed(val);
    }

    if(inp === 'Position X'){
      if(val === ''){
        setShowErrorPosX(true)
      } else {
        setShowErrorPosX(false)
      }
      setPosX(val);
    }

    if(inp === 'Position Y'){
      if(val === ''){
        setShowErrorPosY(true)
      } else {
        setShowErrorPosY(false)
      }
      setPosY(val);
    }

  }

  const setBtnClicked = (btn) => {
    if(btn === 'Add'){

      let url = "http://localhost:3000/vehicles";
      let data = {
        
      }
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if required
        },
        body: JSON.stringify(data), // Convert the data to JSON string
      })
        .then(response => response.json())
        .then(data => {
          alert('Scenario added successfully')
        })
        .catch(error => {
          alert(error)
        });
        
      }

      if(btn === 'Reset'){
      }  
  }
  


  return (
    <div className='add-vehicle'>
      <p>Scenario / add</p>
      <h2>Add Scenario</h2>
      <div className="add-vehicle-box">


        <div style={{display: 'flex', justifyContent: 'space-around', paddingTop: '50px'}}>

          <SelectBox
          label="Scenario List"
          options={data.map(scenario => scenario.name)}
          ></SelectBox>

          <InputBox
          label="Vehicle Name"
          value={vehicleName}
          onChange={onValChange}
          showError={showErrorVehicleName}
          ></InputBox>

          <InputBox
          label="Speed"
          value={speed}
          onChange={onValChange}
          showError={showErrorSpeed}
          ></InputBox>

        </div>

        <div style={{display: 'flex', justifyContent: 'space-around',  paddingTop: '40px'}}>

          <InputBox
          label="Position X"
          value={posX}
          onChange={onValChange}
          showError={showErrorPosX}
          ></InputBox>

          <InputBox
          label="Position Y"
          value={posY}
          onChange={onValChange}
          showError={showErrorPosY}
          ></InputBox>

          <SelectBox
          label="Direction"
          options={directions}
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
        
        ></Button>

        <Button
        text="Go Back"
        color="blue"
        
        ></Button>

        </div>
    </div>
  )
}
