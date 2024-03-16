
import dotenv from 'dotenv'
dotenv.config()

import userRouter from './routes/user.router.js'
import postRouter from './routes/post.route.js'
import express from 'express'
import dbConnection from './db/database.js'
import cors from 'cors'
import authRoute from './routes/auth.route.js'
import commentRouter from './routes/comment.route.js'
import cookieParser from 'cookie-parser'

const app=express()
const PORT=process.env.PORT || 3000


// middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(cookieParser())


// all routes here--
app.use('/api/user',userRouter)
app.use('/api/auth',authRoute)
app.use('/api/post',postRouter)
app.use('/api/comment',commentRouter)

app.listen(PORT,()=>{
    dbConnection(process.env.MONGODB_URL)
    console.log(`server running on ${PORT}`)
})