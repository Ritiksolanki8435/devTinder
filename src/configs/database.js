const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
const MONGO_URI= "mongodb+srv://Ritik:jneJwx4T2BxCF37T@cluster0.xeshx6q.mongodb.net/debTinder"
const connectDB = async () =>{
   await mongoose.connect(MONGO_URI)
}

module.exports = connectDB