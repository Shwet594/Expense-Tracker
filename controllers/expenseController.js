import { userModel , expenseModel} from "../models/userModel.js";
export const addExpense = async (req, res) => {
  try {
    let { description, amount, category,date } = req.body;

    // Create new expense
    let expense = await expenseModel.create({
      user: req.user._id,
      description,
      amount,
      category,
      date
    });

    // Add the expense reference to the user's expense array
    await userModel.findByIdAndUpdate(req.user._id, {
      $push: { expense: expense._id }
    });

    res.redirect("/users/profile");
  } catch (error) {
    console.error("Add expense error:", error.message);
    res.status(500).json({ message: "Failed to add expense" });
  }
};
export const allTransactions = async (req, res) => {
  await cleanupTransactions();  // <-- user comes from the database
  const user = await userModel.findById(req.user._id)
    .populate("income")
    .populate("expense");


  res.render("transactions", { user });
};

export const editExpense = async (req, res) => {
  const expense = await expenseModel.findById(req.params.id);
  res.render("edit", { transaction: expense, type: "Expense" });
};
export const updateExpense = async (req, res) => {
  try {
    const { description, amount, category, date } = req.body;

    const updated = await expenseModel.findByIdAndUpdate(
      req.params.id,
      { description, amount, category, date },
      { new: true } // optional: returns the updated document
    );

    if (!updated) {
      return res.status(404).send("expense not found");
    }

    // Redirect back to transactions page
    res.redirect("/users/All");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
export const deleteExpense = async (req, res) => {
  try {
    const deleted = await expenseModel.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).send("expense not found");
    }

    // Redirect back to all transactions page
    res.redirect("/users/All");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};