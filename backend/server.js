import express from "express";
import dotenv from 'dotenv';
import router from "./routes.js";
import mongoose from "mongoose";
import cors from 'cors';
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const corsOption = {
    origin: ['http://localhost:5500']
};
app.use(cors(corsOption));
app.use(express.json({ limit: "50mb" })); //middleware used to pass JSON data in the request body, before the default limit is 100kb.

const connect = async() => {
    try {
        const con = await mongoose.connect(
            "mongodb+srv://khokharmushahidhussain:SaViKxaNxWPFlvhk@cluster0.lj4qis1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        );

        console.log("DB connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
connect();


// to parse incoming request bodies with JSON payloads. 
app.use(express.json());
app.use(cookieParser()); //middleware to deal with cookies.

app.use('/storage', express.static('storage'));


app.get("/", (req, res) => {
    res.send("hello world")
})

app.use(router);

app.listen(5000, () => {
    console.log("server has started on the motherfucking port 5000");
})