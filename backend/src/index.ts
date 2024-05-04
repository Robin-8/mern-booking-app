import express,{Request,Response} from 'express';
import cors from 'cors'
import "dotenv/config"
import mongoose from 'mongoose'
import userRoute from './routes/userRoute';
import cookieParser from 'cookie-parser'
import path from 'path';


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

app.get('/api/test',async(req:Request,res:Response)=>{
     res.json({message:'hai'})
})

const port = 5000

app.listen(port,()=>{
    console.log(`port run on  http://localhost:${port}`);
    
})


