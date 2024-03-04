// 2nd and best approach in which we write code in a other file and import here 
//require("dotenv").config({path:'./env'})
//--experimental-json-module
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js";

import dotenv from "dotenv"

import connectDB from "./db/db.js";

dotenv.config({
    path:'./env'
})
import express from "express"
const app=express();

connectDB

.then(()=>{
    app.listen(process.env.PORT||8000,()=>
    {
        console.log(`server is running at port :${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("MOngodb conncetion failed !!!",error);
})



































/* 
1st approach where we write code in main file index.js it is not a professional apporach

import mongoose from "mongoose";
import {DB_NAME} from "./constants.js";
//mongoose.connect("mongodb+srv://saurabhmagar:Saurabh2003@cluster0.moyfull.mongodb.net") 
// above is not a professional approach because we need to write in try and catch to handle errors

// function connectDB(){}
// connectDB();

const PORT=8000;
import express from "express"
const app=express();

(async()=>{
    try {
        await mongoose.connect(`${"mongodb+srv://saurabhmagar:Saurabh2003@cluster0.moyfull.mongodb.net"}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERROR",error);
            throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${PORT}`);
        })
    } catch (error) {
        console.error("ERROR is",error)
        throw error
        
    }

})()
*/
