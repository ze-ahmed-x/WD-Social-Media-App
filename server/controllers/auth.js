import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


export  const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000)
        }); // created user but not yet saved; alternate could be User.create({firstnam, lastname ....})
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
    
}

export const login = async (req, res) => {
    // console.log("something")
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({error: "User doesn't exist"});
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({error: "Incorrect Password"});
        
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '3d'});
        delete user.password; //delete one parameter; somehow its not working; i did try to change it from const to let but still...
        user.password = "";
        res.status(200).json({token, user});
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}