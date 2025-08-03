import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

app.use(express.json,({"limit":"16kb"})); // parser json body data
app.use(express.urlencoded({extended: true, limit: "16kb"})); //parse url data like space(%20) etc
app.use(express.static("public"))// image,file to save folder
app.use(cookieParser())// used to set cookie form backend
export { app }