const mongoose = require('mongoose')
require('dotenv').config()
const dbConnect = async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/userAuth`)
        console.log('Connected to database')
    }catch(err){
        console.log(err)
    }
}
module.exports = dbConnect;