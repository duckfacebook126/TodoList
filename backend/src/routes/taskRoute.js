import express from "express";
const router =express.Router();
import {addTask} from "../controllers/taskController.js"

router.post("/addTask",addTask);

export default router;
