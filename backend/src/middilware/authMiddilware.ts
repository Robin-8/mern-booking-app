import { NextFunction,Response,Request } from "express";
import jwt,{JwtPayload} from "jsonwebtoken";

declare global {
    namespace Express {
      interface Request {
        userId:string
      }
    }
}

const verifyToken = async(req:Request,res:Response,next:NextFunction)=>{
    const token = req.cookies['auth_token'];
    try {
        if(!token){
            return res.status(401).json({message:'unauthorized'})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET as string )
        req.userId=(decoded as JwtPayload).userId
        next()
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({message:'unauthorized'})
        
    }
   
}

export default verifyToken;