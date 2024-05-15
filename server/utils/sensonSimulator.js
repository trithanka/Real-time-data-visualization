const sqlite3 = require('sqlite3').verbose();
const db = require('../db/database');

// Simulated sensor data
const sensorData = {
    1: null, // Initial value for sensor 1,2,3
    2: null, 
    3: null
};

function generateTemperatureReading() {
    return Math.random() * 100;
}

//function to insert data into db
function insertSensorData(sensorId, value) {
    const timestamp = new Date().toISOString();
    db.run('INSERT INTO Reading (sensor_id, value, timestamp) VALUES (?, ?, ?)', [sensorId, value, timestamp], (err) => {
        if (err) {
            console.error('Error inserting sensor data:', err);
        } else {
            console.log(`Sensor data inserted for sensor ${sensorId}: ${value}`);
        }
    });
}

function updateSensorData(sensorId, previousValue, newValue) {
    const timestamp = new Date().toISOString();
    db.run('INSERT INTO Reading (sensor_id, value, timestamp) VALUES (?, ?, ?)', [sensorId, newValue, timestamp], (err) => {
        if (err) {
            console.error('Error updating sensor data:', err);
        } else {
            console.log(`Sensor data updated for sensor ${sensorId}: ${previousValue} -> ${newValue}`);
        }
    });
}

function simulateSensorData() {
    const interval = 2000; // Interval in milliseconds

    setInterval(() => {
        // Generate temperature readings for each sensor
        Object.keys(sensorData).forEach(sensorId => {
            const previousValue = sensorData[sensorId];
            const temperatureReading = generateTemperatureReading(); //saving 1-100
            if (previousValue === null) {
                insertSensorData(sensorId, temperatureReading);
            } else {
                updateSensorData(sensorId, previousValue, temperatureReading);
            }
            // Update the sensor data object with the new value
            sensorData[sensorId] = temperatureReading;
        });
    }, interval);
    // console.log(`Data simulating for sensors: ${Object.keys(sensorData).join(',')} every ${interval / 1000} seconds`);
}

module.exports = {
    simulateSensorData
};
