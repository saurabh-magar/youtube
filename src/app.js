import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app=express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//router import 

import userRouter from "./routes/user.routes.js"

//router decleration

app.use("/api/v1/users", userRouter)

//http://localhost:8000/api/v1/users/register  this route is made

export { app }