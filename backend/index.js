import cors from "cors"
import cookieParser from "cookie-parser";
import express from "express"
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoute.js"
import  taskRoutes from "./src/routes/taskRoute.js"
import { connectDb } from "./src/lib/db.js";
dotenv.config();
const app =express();
//created an express application

app.use(cookieParser()); //enable cookies
app.use(express.json());// enable json requests incoming and out going
app.use("/api/auth",authRoutes);
app.use("/api/task",taskRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)
                        connectDb();
                        // db connected to mongodb
});
//runnning the application on a port

