import express from "express";
import { superAdminLogin } from "../controller/adminController";

const router = express.Router();


router.post("/login",superAdminLogin)

export default router; 
