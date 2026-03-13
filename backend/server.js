import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { loginUser, registerUser } from "./controllers/userController.js";

const app = express();
app.use(express.json());
app.use(cors());

// Connect to your local MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/fastbite_db')
    .then(() => console.log("Connected to Local MongoDB"))
    .catch((err) => console.log(err));
app.get("/", (req, res) => {
    res.send("Welcome to FastBite API");
});
// API Endpoints
app.post("/api/user/register", registerUser);
app.post("/api/user/login", loginUser);

app.listen(5000, () => console.log("Server started on port 5000"));