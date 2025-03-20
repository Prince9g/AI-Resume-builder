import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './utils/db.js';
import userRoutes from  "./routes/user.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import cors from 'cors';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;

const corsOption =  {
    origin:'http://localhost:5173',
    credentials :true
}

app.use(cors(corsOption));
app.use("/api/auth", userRoutes);
app.use("/api/resume", resumeRoutes);
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})