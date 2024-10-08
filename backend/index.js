//imports
const express = require('express')
const app = express();
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 3000
const userRoute = require('./Routes/userRoute')
const protectedRoute = require('./Routes/protectedRoute')
const dbConnect = require('./Config/dbConnect')
//dbConnection
dbConnect();
app.use(express.json())
app.use(cors())
app.get('/',(req,res)=>{
    res.json({message:"Welcome to Server"});
})
app.use('/auth',userRoute)
app.use('/homepage',protectedRoute)
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})