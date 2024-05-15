import { Request, Response } from 'express';
import User from '../model/user'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Hotel from '../model/hotel';


 export const adminLogin =async(req:Request,res:Response)=>{
    const {email,password}=req.body
    console.log(req.body,'amdin body');
    
    try {
        const user = await User.findOne({email,role:'admin'})
       
        
        if(!user){
            return res.status(401).json({
                message:'Invalid email or password'
            })       
        }
        if(user.role!=='admin')
            {
                res.status(401).json({message:'you are not a admin'})
            }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({
                message:'Invalid email or password'
            })
        }
        const token = jwt.sign({userId:user.id},process.env.JWT_SECRET as string,{
            expiresIn:'1d'
        })
        res.cookie("auth_token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            maxAge:8640000 // 1d
        })
        res.status(200).json({userId:user._id,message:'Login successful'})
    } catch (error) {
        console.log(error,"some error happening");
        res.status(500).json({
            message:'Internal Server Error'
        })
    }
}

export const GetAdminHotels = async(req:Request,res:Response)=>{
    try {
        const response = await Hotel.find({userId:req.userId})
        console.log(response,'response');
        console.log(req.userId,'req.userId');
        
        
        
    
        
        if(!response){
            res.status(400).json({
                message:'no hotel found'
            })
        }
        res.status(200).json({
            message:'hotel found',
            hotel:response
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:'Internal Server Error'
        })
        
    }
}

// for editing one hotels

export const editHotel = async(req:Request,res:Response)=>{
   const id = req.params.id
   try {
      const hotel = await Hotel.findOne({_id:id,userId:req.userId})
      if(!hotel){
        res.status(400).json({
            message:'not hotel found'
        })
        res.status(200).json({
            message:'hotel found',
            hotel:hotel
        })
      }
   } catch (error) {
    console.log(error);
    res.status(500).json({message:'internal server error'})
    
   }
}
