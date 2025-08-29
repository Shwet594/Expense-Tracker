import mongoose from "mongoose";

const userSchema =mongoose.Schema({
    username:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        trim:true,
    },
    password:{
        type:String,
       trim:true
    },
    expense:[
      {type:mongoose.Schema.Types.ObjectId,
      ref: "Expense"}
    ],
    income:[
      {type:mongoose.Schema.Types.ObjectId,
        
      ref: "Income"}
    ],
},{
    timestamps:true
});
export const userModel = mongoose.model("User",userSchema);
const incomeSchema = new mongoose.Schema({
 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  category: { type: String, 
    enum:['Salary','Bonus','Extra'],trim: true },
  description: { type: String, trim: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }

});


export const incomeModel = mongoose.model("Income",incomeSchema);
const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  category: { type: String, enum:['FixedBills','Foodandtravel','Groceries','Miscellaneous'],trim: true },
  description: { type: String, trim: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

export const expenseModel = mongoose.model("Expense",expenseSchema);