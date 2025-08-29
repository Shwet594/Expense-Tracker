

import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { userModel } from "../models/userModel.js";
export const register=async(req,res)=>{
    let {username,password,email}=req.body;
    let hash = await bcrypt.hash(password,10);
    let user = await  userModel.create({
        username,
        password:hash,
        email
    });
    res.redirect("/");
}
export const login=async(req,res)=>{
    let {email,password}=req.body;
    let user = await userModel.findOne({email}).populate("income").populate("expense");
    if(!user) {
         res.json({
        message:"no registered user"
    })}
    let check = await bcrypt.compare(password,user.password);
    if(!check) return res.status(400).json({message:"invalid password"});
    const token = jwt.sign({id:user._id},process.env.JWT_KEY,{expiresIn:"1h"});
    res.cookie("token",token);
    res.redirect("/users/profile")
}

export const profile = async (req, res) => {
  try {
    // check if token exists
    if (!req.cookies.token) {
      return res.redirect("/auth/login"); // or send error
    }

    // verify token
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

    // find user
    let user = await userModel.findById(decoded.id).populate("income").populate("expense");

    if (!user) {
      return res.json({ message: "No registered user" });
    }

    // attach user to req (optional)
    req.user = user;

    // render profile page with user data
    res.render("profile", { user });

  } catch (error) {
    console.error("Profile error:", error.message);
    res.redirect("/")
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");W
};
