import express from "express";
import { register, login,logout,profile } from "../controllers/authController.js";
import { allTransactions, filterTransactions } from "../controllers/transactionController.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes
router.post("/register", register);
router.post("/login", login);
router.get("/logout", isLoggedIn,logout);
router.get("/profile",isLoggedIn,profile);
router.get("/All",isLoggedIn,allTransactions)
router.get("/transactions/filter",isLoggedIn,filterTransactions)
router.post("/logout", logout);


export default router;
