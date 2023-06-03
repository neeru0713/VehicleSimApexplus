import React, {useState} from 'react';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { BiEditAlt } from 'react-icons/bi';
import { HiPlusCircle } from 'react-icons/hi';
import { InputBox } from './InputBox';



export const Table = ({ headerData, tableData, tableName, handleDelete, updateHandler }) => {


    const [rowToEdit, setRowToEdit] = useState('')
    const [scenarioName, setScenarioName] = useState('')
    const [scenarioTime, setScenarioTime] = useState('')

    const [vehicleName, setVehicleName] = useState('')
    const [posx, setPosx] = useState('')
    const [posy, setPosy] = useState('')
    const [speed, setSpeed] = useState('')
    const [direction, setDirection] = useState('')


    const scenarioNameChange = (val) => {
        setScenarioName(val)
    }

    const scenarioTimeChange = (val) => {
        setScenarioTime(val)
    }

    const vehicleNameChange = (val) => {
        setVehicleName(val)
    }

    const posxChange = (val) => {
        setPosx(val)
    }

    const posyChange = (val) => {
        setPosy(val)
    }

    const speedChange = (val) => {
        setSpeed(val)
    }

    const directionChange = (val) => {
        setDirection(val)
    }

    const editHandler = (index) => {
        if(rowToEdit === index){
            if(tableName === "scenarios"){
                updateHandler(rowToEdit, scenarioName, scenarioTime)
            } else{
                updateHandler(rowToEdit, vehicleName, posx, posy, speed, direction)
            }
            
            setRowToEdit('')
         } else setRowToEdit(index)
    }

    return (
        <table>
          <thead>
            <tr>
              {headerData.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
              {tableName === 'scenarios' && <th>Vehicle</th>}
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              tableName === 'scenarios' ? (
                <tr key={rowIndex}>
                  <td>{row.id}</td>
                  <td>{ rowToEdit === row.id ? <InputBox value={scenarioName} onChange={scenarioNameChange}/> : row.name}</td>
                  <td>{ rowToEdit === row.id ? <InputBox value={scenarioTime} onChange={scenarioTimeChange}/> : row.time}</td>
                  <td>{row.vehicles}</td>
                  <td><HiPlusCircle /></td>
                  <td onClick={() => editHandler(row.id)}><BiEditAlt /></td>
                  <td onClick={e => handleDelete(row.id)}><BsFillTrash3Fill /></td>
                </tr>
              ) : (
                <tr key={rowIndex}>
                  <td>{row.id}</td>
                  <td>{ rowToEdit === row.id ? <InputBox value={vehicleName} onChange={vehicleNameChange}/> : row.name}</td>
                  <td>{ rowToEdit === row.id ? <InputBox value={posx} onChange={posxChange}/> : row.posx}</td>
                  <td>{ rowToEdit === row.id ? <InputBox value={posy} onChange={posyChange}/> : row.posy}</td>
                  <td>{ rowToEdit === row.id ? <InputBox value={speed} onChange={speedChange}/> : row.speed}</td>
                  <td>{ rowToEdit === row.id ? <InputBox value={direction} onChange={directionChange}/> : row.direction}</td>
                  <td onClick={() => editHandler(row.id)}><BiEditAlt /></td>
                  <td onClick={e => handleDelete(row.id)}><BsFillTrash3Fill /></td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      );
    
};
