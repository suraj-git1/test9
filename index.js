import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose"
mongoose.connect(process.env.DB_URL)

import express from "express"
import { login, signup } from "./controller/user.controller.js"
import chalk from "chalk"
const app = express()
app.listen(8000, ()=>{
    // console.log(chalk.green.bold('✅ App is running on port 8000'))
    console.log(chalk.greenBright.bold('🚀 Server started on port 8000'))
})

app.get('/signup', signup)
app.get('/login', login)