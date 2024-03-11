
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import dbConnection from './db/database.js'

const app=express()
const PORT=process.env.PORT || 3000


app.listen(PORT,()=>{
    dbConnection(process.env.MONGODB_URL)
    console.log(`server running on ${PORT}`)
})