const express=require("express")
const router=express.Router()

router.use("/sensor",require('./Routes/sensorRoute'))

module.exports=router