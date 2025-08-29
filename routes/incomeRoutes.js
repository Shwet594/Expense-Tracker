import express from "express";
import { addIncome,editIncome,updateIncome ,deleteIncome} from "../controllers/incomeController.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add",isLoggedIn,addIncome);
router.get("/edit/:id",isLoggedIn,editIncome);
router.post("/delete/:id",isLoggedIn,deleteIncome);
router.post("/update/:id",isLoggedIn,updateIncome);
export default router;
