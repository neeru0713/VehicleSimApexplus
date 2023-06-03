import React from 'react';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { BiEditAlt } from 'react-icons/bi';
import { HiPlusCircle } from 'react-icons/hi';



export const Table = ({ headerData, tableData, tableName, handleDelete }) => {
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
                  <td>{row.name}</td>
                  <td>{row.time}</td>
                  <td>{row.vehicles}</td>
                  <td><HiPlusCircle /></td>
                  <td><BiEditAlt /></td>
                  <td onClick={e => handleDelete(row.id)}><BsFillTrash3Fill /></td>
                </tr>
              ) : (
                <tr key={rowIndex}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.posx}</td>
                  <td>{row.posy}</td>
                  <td>{row.speed}</td>
                  <td>{row.direction}</td>
                  <td><BiEditAlt /></td>
                  <td onClick={e => handleDelete(row.id)}><BsFillTrash3Fill /></td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      );
    
};
