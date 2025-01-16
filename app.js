import express from 'express';
import db from './config/db.js';
import userRouter from './routes/userRoutes.js'
import userRoutes from './routes/userRoutes.js'
db();

let app=express();
//middlewares
app.use(express.json())

//base route
app.use("/api/v1/user",userRouter)
app.use("/api/v1/user",userRoutes)

//global error handling middleware
app.use((err,req,res,next)=>{
    console.log(err.stack);
    return res.status(400).json(err.message);
})
export default app;