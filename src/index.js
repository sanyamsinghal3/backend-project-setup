// this code for env file whole app, but is old new is with import below
//##require('dotenv').config({path:'./env'});
//## new method
import dotenv from "dotenv" 
dotenv.config({
    path:"./env"
})
//also change line of in packages.json "dev": "nodemon src/index.js",


 


import connectDB from "./db/index.js";
connectDB();

/*
 arrow function with iffi or immadiate invoke function`()`
 code for database connections
*/

/*
import mongoose from "mongoose";
import { DB_NAME } from "./constant";
first method db connection commented
(async ()=>{
    try {
        mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        // exppess listner for detect error while db connection
        app.on("error",(error)=>{
            console.log("error", error);
            throw error;            
        })

        //app.listen(3000,()=> {
        app.listen(process.env.PORT,()=>{
          console.log("server running 3000");
        });
    } catch (error) {
        console.log("ERROR: ", error);
        throw error;
        
    }
})()
*/