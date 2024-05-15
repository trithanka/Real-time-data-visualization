const db = require('../../db/database');

//get all sensor 
const getSensorData=async(req,res)=>{
    let query = "SELECT * FROM Reading";
    let params = [];
    // Check if filters are provided in the request query
    if (req.query.startTime && req.query.endTime) {
        query += " WHERE timestamp BETWEEN ? AND ?";
        params = [req.query.startTime, req.query.endTime];
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            console.error('Error retrieving sensor data:', err);
            return res.status(500).json({ error: 'Failed to retrieve sensor data' });
        }
        
        res.json({ data: rows });
    });
}

//delete sensor
const deleteSensorData = async (req, res) => {
    const sensorId = req.params.sensor_id;

    // Construct the delete query
    const deleteQuery = "DELETE FROM Reading WHERE sensor_id = ?";
    
    // Execute the delete query
    db.run(deleteQuery, [sensorId], (err) => {
        if (err) {
            console.error('Error deleting sensor data:', err);
            return res.status(500).json({ error: 'Failed to delete sensor data' });
        }
        // Return success response if deletion is successful
        res.status(204).json({msg:"deleted successfully"});
    });
};


//create sensor data
const createSensorData=async(req,res)=>{
    const { sensor_id, value } = req.body;

    // Validate request body
    if (!sensor_id || !value) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Insert sensor data into the database
    const timestamp = new Date().toISOString();
    db.run('INSERT INTO Reading (sensor_id, value, timestamp) VALUES (?, ?, ?)', [sensor_id, value, timestamp], (err) => {
        if (err) {
            console.error('Error inserting sensor data:', err);
            return res.status(500).json({ error: 'Failed to add sensor data' });
        }
        
        // Return success response
        res.json({ message: 'Sensor data added successfully' });
    });
}

module.exports={getSensorData,createSensorData, deleteSensorData}