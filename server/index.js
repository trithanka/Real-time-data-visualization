const express=require("express");
const cors=require("cors")
const app=express()

app.use(cors())
const { simulateSensorData } = require("./utils/sensonSimulator");
const sqlite3 = require('sqlite3').verbose(); // Import sqlite3 module

const port=5000

// Body parsing middleware
app.use(express.json());

app.use("/v1",require("./v1/route"))

// Connect to the SQLite database

const db = new sqlite3.Database('./db/database.sqlite', (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database');
    }
});




// Start simulating sensor data
// simulateSensorData();

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})