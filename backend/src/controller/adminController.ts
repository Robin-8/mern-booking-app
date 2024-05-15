import express,{Request,Response} from 'express'
import User from '../model/user'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const superAdminLogin = async(req:Request,res:Response)=>{
    const {email,password} = req.body
    try {
        const user = await User.findOne({email,role:'superadmin'})
        if(!user){
            return res.status(400).json({message:'no superadmin found'})
        }
        if(user.role !== 'superadmin'){
            return res.status(400).json({message:'only super admin can login'})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:'invalid credentials'})
        }
       const token = jwt.sign({userId:user.id},process.env.JWT_SECRET as string,{
        expiresIn:'1d'
       })
       res.cookie("auth_token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        maxAge:8640000
       })
           
       res.status(200).json({message:'login successful'})

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'internal server error'})
        
    }
}