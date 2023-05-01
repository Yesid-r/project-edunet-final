import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import userRoute from './routes/users.js'
import documentRoute from './routes/documents.js'
import authRoute from './routes/auth.js'
import reviewRoute from './routes/reviews.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 8000
const corsOptions = {
    origin:true,
    credentials:true
}

//test 
app.get('/',(req,res)=>{res.send('api is working')})

//database connection
mongoose.set('strictQuery', false)
const connect  = async()=>{
    try{
        await   mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true ,
            useUnifiedTopology:true,
        })
        console.log('MongoDB database conneccted')
    }catch(err){
        console.log(`Error --> ${err}`)
    }
}

//middleware

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

app.use('/users', userRoute)
app.use('/documents', documentRoute)
app.use('/auth', authRoute)
app.use('/review', reviewRoute)

app.listen(port, ()=>{
    connect()
    console.log(`server listening on port ${port}`)})