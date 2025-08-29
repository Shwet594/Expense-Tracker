import { userModel } from "../models/userModel.js";
import { cleanupTransactions } from "../middleware/authMiddleware.js";


// 📌 Show all transactions (income + expense)
export const allTransactions = async (req, res) => {
  try {
    const userId = req.user._id;

    let user = await userModel.findById(userId)
      .populate("income")
      .populate("expense");

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Merge income + expense
    let allTransactions = [
      ...user.income.map(i => ({ ...i._doc, type: "Income" })),
      ...user.expense.map(e => ({ ...e._doc, type: "Expense" }))
    ];

    // Extract unique categories from both
    let allCategories = [...new Set(allTransactions.map(txn => txn.category))];

    // Sort by date (latest first)
    allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    cleanupTransactions();
    res.render("transactions", {
      user,
      transactions: allTransactions,
      categories: allCategories,
      startDate: "",
      endDate: "",
      category: ""
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while loading transactions");
  }
};

// 📌 Filter transactions by date & category
export const filterTransactions = async (req, res) => {
  try {
    const userId = req.user._id;
    const { startDate, endDate, category } = req.method === "POST" ? req.body : req.query;

    let user = await userModel.findById(userId)
      .populate("income")
      .populate("expense");

    if (!user) return res.status(404).send("User not found");

    // Merge income + expense
    let allTransactions = [
      ...user.income.map(i => ({ ...i._doc, type: "Income" })),
      ...user.expense.map(e => ({ ...e._doc, type: "Expense" }))
    ];

    // Apply filters
    let filteredTransactions = allTransactions.filter(txn => {
      let valid = true;

      // Only filter by startDate if provided
      if (startDate) valid = valid && new Date(txn.date) >= new Date(startDate);

      // Only filter by endDate if provided
      if (endDate) valid = valid && new Date(txn.date) <= new Date(endDate);

      // Only filter by category if provided
      if (category && category !== "") valid = valid && txn.category === category;

      return valid;
    });

    // Extract unique categories for dropdown
    let allCategories = [...new Set(allTransactions.map(txn => txn.category))];

    // Sort by date descending
    filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.render("transactions", {
      user,
      transactions: filteredTransactions,
      categories: allCategories,
      startDate,
      endDate,
      category
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while filtering transactions");
  }
};

