import express from "express";
const router =express.Router();
import {userSignup,userLogin} from "../controllers/authController.js"

router.post("/signup",userSignup);

export default router;


