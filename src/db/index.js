
import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB=(async()=>{
    try {
        const conInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`db conneced ${conInstance} ${DB_NAME}`);        
    } catch (error) {
        console.log("DB connection error :", error);
        process.exit(1) // node js applicaion current process reference is process
    }
})
export default connectDB;