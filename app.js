import express, { urlencoded } from "express";
import authRoutes from "./routes/authRoutes.js"
import incomeRoutes from "./routes/incomeRoutes.js"
import expenseRoutes from "./routes/expenseRoutes.js"
import ConnectDB from "./config/db.js";
import dotenv from "dotenv";

import cookieParser from "cookie-parser";
const app = express();
dotenv.config();
ConnectDB();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", "./views"); // optional if you keep views folder in root

app.get("/",(req,res)=>{
    res.render("index");
});
app.use("/auth",authRoutes);
app.use("/users",authRoutes);
app.use("/users/income",incomeRoutes);
app.use("/users/expense",expenseRoutes);
const PORT =process.env.PORT
app.listen(PORT,()=>{
    console.log(`Your server is running on http://localhost:${PORT}/`)
});