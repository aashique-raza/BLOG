
import dotenv from 'dotenv'
dotenv.config()

import userRouter from './routes/user.router.js'
import express from 'express'
import dbConnection from './db/database.js'

const app=express()
const PORT=process.env.PORT || 3000


// middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))


// all routes here--
app.use('/api',userRouter)

app.listen(PORT,()=>{
    dbConnection(process.env.MONGODB_URL)
    console.log(`server running on ${PORT}`)
})