import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./css/viewSensor.css"

function ViewSensor() {
  // Define state to store sensor data
  const [data, setSensors] = useState([]);

  // Fetch sensor data from backend object data
  useEffect(() => {
    axios.get('http://localhost:5000/v1/sensor/')
      .then(res => setSensors(res.data.data))  
      .catch(err => console.error(err));
  }, []); // Empty dependency array to run once 
  
//using index to uniquely represent each data sensor,help react when data is added or removed
  return (
    <div className='container'>
      <h2>View Sensors</h2>
      <table className='sensor-table'>
        <thead>
          <tr>
            <th>Sensor ID</th>
            <th>Value</th>
            <th>timestamp</th>
          </tr>
        </thead>
        <tbody>
          {data.map((sensor, index) => (
            <tr key={index}>    
              <td>{sensor.sensor_id}</td>
              <td>{sensor.value}</td>
              <td>{sensor.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewSensor;
