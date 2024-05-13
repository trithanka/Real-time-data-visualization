const express=require("express")
const { getSensorData, createSensorData, deleteSensorData } = require("../controller/sensorController")
const router=express.Router()


//to get sensor data
router.get("/",getSensorData)

//for sensor data ingestion
router.post("/",createSensorData)

//for deleting a sensor 
router.delete("/:sensor_id",deleteSensorData)

module.exports=router