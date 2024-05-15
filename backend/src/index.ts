import express from 'express';
import cors from 'cors'
import "dotenv/config"
import mongoose from 'mongoose'
import userRoute from './routes/userRoute';
import hotelRoute from './routes/hotelRoute'
import adminRoute from './routes/adminRoute'
import cookieParser from 'cookie-parser'
import path from 'path';
import{ v2 as cloudinary }from 'cloudinary';

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
})


mongoose.connect(process.env.MONGO_URL as string)


const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}))
app.use(express.static(path.join(__dirname,"../../frontend/dist")))

app.use('/api/user',userRoute)
app.use('/api/admin',hotelRoute)
app.use('/api/super',adminRoute)


const port = 5000

app.listen(port,()=>{
    console.log(`port run on  http://localhost:${port}`);
    
})


