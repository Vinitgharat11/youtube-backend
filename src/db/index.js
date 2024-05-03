import mongoose from "mongoose";
import {DB_NAME} from '../constant.js'
const connectDB = ()=>{
  try {
    mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
  } catch (error) {
    console.log("MongoDb Connection Failed ",error)
    process.exit(1)
  }
}


export default connectDB