import express from "express";
import userRouter from "./routes/user.js"
import noteRouter from "./routes/note.js"
import bodyParser from "body-parser";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express()

config({
    path:"./data/config.env"
});


//Middleware
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","PUT","POST","DELETE"],
    credentials:true
}))
app.use("/api/v1/users",userRouter);
app.use("/api/v1/notes",noteRouter);


app.get('/',(req,res)=>{
    res.send("Working all good");
})

//Using error middleware
app.use(errorMiddleware);
