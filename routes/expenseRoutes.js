import express from "express";
import { addExpense,editExpense,deleteExpense,updateExpense } from "../controllers/expenseController.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add",isLoggedIn,addExpense);
router.get("/edit/:id",isLoggedIn,editExpense);
router.post("/delete/:id",isLoggedIn,deleteExpense);
router.post("/update/:id",isLoggedIn,updateExpense);
export default router;
