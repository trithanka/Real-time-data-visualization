import React, { useState } from 'react';
import axios from 'axios';
import "./css/DeleteSensor.css"

function DeleteSensor() {
  const [sensorId, setSensorId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();   //to use custom logic
    try {
      // Send a DELETE request to the backend API 
      await axios.delete(`http://localhost:5000/v1/sensor/${sensorId}`);
      // If deletion is successful, clear the input field
      setSensorId('');
      alert('Sensor data deleted successfully.');
    } catch (error) {
      console.error('Error deleting sensor data:', error);
      alert('Failed to delete sensor data. Please try again.');
    }
  };

  return (
    <div className="delete-sensor-container">
      
      <form className='form-delete' onSubmit={handleSubmit}>
      <h2>Delete Sensor</h2>
        {/* <label htmlFor="sensorId">Sensor ID:</label> */}
        <input
            placeholder='Enter Sensor ID'
          type="text"
          id="sensorId"
          value={sensorId}
          onChange={(e) => setSensorId(e.target.value)}
          required
        />
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}

export default DeleteSensor;
