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
      ></Table>
    </div>
  )
}
