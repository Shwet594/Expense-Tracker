import { incomeModel, userModel } from "../models/userModel.js";

export const addIncome=async(req,res)=>{
    let {description , amount , category,date} =req.body;
    let income = await incomeModel.create({
      user: req.user._id,
      description, amount, category ,date
      });
        await userModel.findByIdAndUpdate(req.user._id, {
    $push: { income: income._id }
  });
    res.redirect("/users/profile")
  }
export const editIncome = async (req, res) => {
  const income = await incomeModel.findById(req.params.id);
  res.render("edit", { transaction: income, type: "Income" });
};
export const updateIncome = async (req, res) => {
  try {
    const { description, amount, category, date } = req.body;

    const updated = await incomeModel.findByIdAndUpdate(
      req.params.id,
      { description, amount, category, date },
      { new: true } // optional: returns the updated document
    );

    if (!updated) {
      return res.status(404).send("Income not found");
    }

    // Redirect back to transactions page
    res.redirect("/users/All");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
export const deleteIncome = async (req, res) => {
  try {
    const deleted = await incomeModel.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).send("Income not found");
    }

    // Redirect back to all transactions page
    res.redirect("/users/All");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

