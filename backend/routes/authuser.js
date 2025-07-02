const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt =  require("bcrypt");
const userRouter= express.Router();
const User = require('../models/user');
userRouter.post('/register', async (req, res) => {
    try {
        const { username, email, password,confirmPassword,city,isVerified } = req.body;
        if (!email || !password || !username || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(401).json({ message: "User already exists!" });
        }
        if (password === confirmPassword){
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, email, password: hashedPassword,city,isVerified });
            await newUser.save();
            return res.status(201).json({ message: "Registration successful" });
        }
        else{
            res.status(401).json({message:"Passwords are not matching"})
        }
        
    } catch (error) {
        console.error("Error in /register:", error); 
        return res.status(500).json({ message: "Something went wrong. Please try again." });
    }
});

userRouter.post('/login',async(req,res)=>{
   try {
        const{email,password}=req.body
        const emailExists = await User.findOne({email});
        console.log("User found:", emailExists);
        if(!emailExists){
           
            return res.status(401).json({message:"User not registered!"})
            
        }
        const isMatch = await bcrypt.compare(password,emailExists.password);
        if(!isMatch){
           return  res.status(401).json({message:"Password is incorrect"});
        };
        const token = jwt.sign(
            {
                id: emailExists.id,
                email: emailExists.email,
                isVerified: emailExists.isVerified 
            },
            process.env.JWT_SECRETKEY,
            { expiresIn: '1d' }
        );
         res.json({
            token,
            user: {
              id: emailExists._id,
              username: emailExists.username,
              email: emailExists.email,
            }
    });
   } catch (error) {
         console.error("Login error:", error); 
         res.status(500).json({ message: "Internal server error" });
   }
});


module.exports =userRouter