import express,{Request,Response}from "express";
import {registerUser,loginUser, logout} from "../controller/userController"
import {validateRegistration,validationLogin} from "../controller/userController"
import verifyToken from "../middilware/authMiddilware";

const router = express.Router();

router.post("/register",validateRegistration,registerUser)
router.post('/login',validationLogin,loginUser)

router.get('/validate-token',verifyToken,(req:Request,res:Response)=>{
    res.status(200).send({userId:req.userId})
})

router.post('/logout',logout)

export default router; 