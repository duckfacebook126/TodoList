import express from "express";
const router =express.Router();
import {userSignup,userLogin,checkAuth} from "../controllers/authController.js"

router.post("/signup",userSignup);
router.post("/check",checkAuth)

export default router;


