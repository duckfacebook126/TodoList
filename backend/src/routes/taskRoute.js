import express from "express";
const router =express.Router();
import {addTask} from "../controllers/taskController.js"
import {getTasks} from "../controllers/taskController.js"
import {deleteTask} from "../controllers/taskController.js"
import {editTask} from "../controllers/taskController.js"


import {checkAuth} from '../middleware/checkAuth.js'
router.post("/add",checkAuth,addTask);
router.get("/getask/:userId",checkAuth,getTasks);
router.delete("/deltask/:taskId",deleteTask);
router.patch("/editask/:taskId",editTask);



export default router;
