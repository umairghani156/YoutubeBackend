import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../error.js";
import  Jwt  from "jsonwebtoken";
export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash })

        await newUser.save();
        res.status(200).json({
            status: true,
            message: "User has been created"
        })
    } catch (err) {
        next(err)
    }
}
export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ name: req.body.name })
        if (!user) return next(createError(404, "User not found!"));
        const isCorrect = bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) return next(createError(400, "Wrong credential!"))
        
        const token = Jwt.sign({id: user._id}, process.env.JWT );
        console.log('token', token);
        const {password, ...others} = user._doc;
        res.cookie("access_token", token,{
            httpOnly: true
        }).status(200)
        .json(others)
    } catch (err) {
        next(err)
    }
};

export const googleAuth = async (req, res, next)=>{
    try{
      const user = await User.findOne({email:req.body.email});
      if(user){
        const token = Jwt.sign({id: user._id}, process.env.JWT);
        res.cookie("access_token", token,{
            httpOnly: true,
        }).status(200)
        .json(user._doc)
      }else{
        const newUser = new User({
            ...req.body,
            fromGoogle: true
        });
        const savedUser = await newUser.save();
        const token = Jwt.sign({id: savedUser._id}, process.env.JWT);
        res.cookie("access_token", token,{
            httpOnly: true,
        }).status(200)
        .json(savedUser._doc)
      }
    }catch(err){
      next(err)
    }
}

export const heyBoy = (req, res)=>{
    res.send("Hello Kahan ho aap")
}