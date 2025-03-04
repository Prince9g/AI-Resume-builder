import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './utils/db.js';
import userRoutes from  "./routes/user.routes.js";
import resumeRoutes from "./routes/resume.routes.js";

dotenv.config();
const server = express();

server.use(express.json());


const PORT = process.env.PORT || 8000;

server.use("/api/auth", userRoutes);
server.use("/api/resume", resumeRoutes);
server.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})