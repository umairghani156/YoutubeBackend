import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/users.js";
import commentRoutes from "./routes/comments.js";
import videoRoutes from "./routes/videos.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config()
const PORT = process.env.PORT || 8000;
const connect = ()=>{
    mongoose.connect(process.env.MONGO_URI).then((res)=>{
        console.log("Connected to DB");
    })
    .catch((error) =>{
        throw error;
    })
};

app.get("/",(req, res)=>{
  res.send("Hello World Bro")
})
//Hello world
//console.log(connect);
app.use(cors({
  origin:'http://localhost:5173', // Replace with your frontend origin
  WithCredentials: true,
}))
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

app.use((err, req, res, next)=>{
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  })
})
//hello
app.listen(PORT, ()=>{
    connect()
    console.log("Connected to server");
})