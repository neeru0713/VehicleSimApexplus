import React, {useEffect, useState} from 'react'
import { Button } from './Button';
import { Table } from './Table';

export const AllScenario = () => {
  const [data, setData] = useState([]);
  const headerData = ["Scenario Id", "Scenario Name", "Scenario Time", "Number of Vehicles"]

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

  return (
    <div className='all-scenarios'>
      <div className='all-scenarios-header'>
        <h2>All Scenarios</h2>
        <div className="all-scenario-btns">
            <Button
            text="New Scenario"
            color="blue"
            
            ></Button>

            <Button
            text="Add Vehicle"
            color="green"
            
            ></Button>

            <Button
            text="Delete All"
            color="orange"
            
            ></Button>

        </div>
      </div>
      <Table
      headerData={headerData}
      tableData={data}
      ></Table>
    </div>
  )
}
