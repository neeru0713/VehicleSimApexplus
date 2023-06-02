import React from 'react'

export const Table = () => {
  return (
    <div className="table">
        <table>
            <thead>
                <tr>
                <th>Vehicle Id</th>
                <th>Vehicle Name</th>
                <th>Speed</th>
                <th>Position X</th>
                <th>Position Y</th>
                <th>Direction</th>
                <th>Edit</th>
                <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Car A</td>
                    <td>50</td>
                    <td>10</td>
                    <td>20</td>
                    <td>North</td>
                    <td><i class="fas fa-edit"></i></td>
                    <td><i class="fas fa-trash"></i></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Car B</td>
                    <td>60</td>
                    <td>15</td>
                    <td>25</td>
                    <td>South</td>
                    <td><i class="fas fa-edit"></i></td>
                    <td><i class="fas fa-trash"></i></td>
                </tr>
            </tbody>
        </table>

    </div>
  )
}
