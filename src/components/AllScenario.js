import React, {useEffect, useState} from 'react'
import { Button } from './Button';
import { Table } from './Table';

export const AllScenario = () => {
  const [data, setData] = useState([]);
  const headerData = ["Scenario Id", "Scenario Name", "Scenario Time", "Number of Vehicles"]


  const fetchScenarios = async () => {
    try {
      const response = await fetch('http://localhost:3000/scenarios');
      const jsonData = await response.json();
      
      setData(jsonData);
    } catch (error) {
      setData([{
        "name": "Scenario 1",
        "time": "8s",
        "vehicles": 0,
        "id": 1
      },
      {
        "name": "scenario 2",
        "time": "4s",
        "vehicles": 0,
        "id": 2
      }])
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchScenarios();
  }, []); // Empty dependency array to run the effect only once


  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/scenarios/${id}`, {
        method: 'DELETE',
      });
      fetchScenarios(); // Fetch the updated data after deletion
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const updateScenario = async (scenarioId, newName, newTime) => {
    try {
      const response = await fetch(`http://localhost:3000/scenarios/${scenarioId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName, time: newTime+'s', vehicles: 0 }),
      });
  
      if (response.ok) {
        console.log('Scenario updated successfully');
        fetchScenarios()
      } else {
        console.error('Failed to update scenario');
      }
    } catch (error) {
      console.error('Error updating scenario:', error);
    }
  };

  const deleteScenario = async (id) => {
    handleDelete(id)
  }

  const setBtnClicked = (val) => {
    if(val === 'Delete All'){
      // api call to delete all scenarios

      data.forEach((item,index) => {
        handleDelete(index+1)
      })
      

    }
  }

  return (
    <div className='all-scenarios'>
      <div className='all-scenarios-header'>
        <h2>All Scenarios</h2>
        <div className="all-scenario-btns">
            <Button
            text="New Scenario"
            color="blue"
            link="/addscenario"
            ></Button>

            <Button
            text="Add Vehicle"
            color="green"
            link="/addvehicle"
            ></Button>

            <Button
            text="Delete All"
            color="orange"
            setBtnClicked={setBtnClicked}
            ></Button>

        </div>
      </div>
      <Table
      headerData={headerData}
      tableData={data}
      tableName="scenarios"
      handleDelete={deleteScenario}
      updateHandler={updateScenario}
      ></Table>
    </div>
  )
}
