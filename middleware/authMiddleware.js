import jwt from "jsonwebtoken";
import { userModel ,expenseModel,incomeModel} from "../models/userModel.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    // check if token exists
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).send("Not logged in");
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // find user
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).send("User not found");
    }

    // attach user to request
    req.user = user;
    next();

  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).send("Invalid or expired token");
  }
};
export const cleanupTransactions = async () => {
  try {
    const users = await userModel.find();

    for (let user of users) {
      // Clean income
      const validIncomeIds = [];
      for (let incomeId of user.income) {
        const exists = await incomeModel.exists({ _id: incomeId });
        if (exists) validIncomeIds.push(incomeId);
      }

      // Clean expense
      const validExpenseIds = [];
      for (let expenseId of user.expense) {
        const exists = await expenseModel.exists({ _id: expenseId });
        if (exists) validExpenseIds.push(expenseId);
      }

      // Update only if arrays changed
      if (validIncomeIds.length !== user.income.length || validExpenseIds.length !== user.expense.length) {
        user.income = validIncomeIds;
        user.expense = validExpenseIds;
        await user.save();
      }
    }
  } catch (err) {
    console.error("Error during cleanup:", err);
  }
};