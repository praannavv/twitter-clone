import User from "../models/user.model.js";
import {generateTokenAndSetCookie} from '../lib/utils/generateToken.js'
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "invalid email format" });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    if(password < 6){
      return res.status(400).json({error:"password must be at least 6 characters long"})
    }


    //hashPassword
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    if(newUser){
      generateTokenAndSetCookie(newUser._id,res)
      await newUser.save()
      res.status(201).json({
        _id:newUser._id,
        fullName:newUser.fullName,
        username:newUser.username,
        email:newUser.email,
        followers:newUser.followers,
        following:newUser.following,
        profileImg:newUser.profileImg,
        coverImg:newUser.coverImg
      })
    }else{
      res.status(400).json({error:"Invalid user data"})
    }
  } catch (err) {
    console.log("Error is signup controller", err.message)
    res.status(500).json({error : "internal server error"})


  }
};
export const login = async (req, res) => {
 try{

  const {username , password} = req.body;
  const user = await User.findOne({username})
  const isPasswordCorrect = await bcrypt.compare(password , user?.password || "")

  if(!user || !isPasswordCorrect){
    return res.status(400).json({error:"Invalid username or password"})
  }

  generateTokenAndSetCookie(user._id,res);

  res.status(200).json({
    _id:user._id,
    fullName:user.fullName,
    username:user.username,
    email:user.email,
    followers:user.followers,
    following:user.following,
    profileImg:user.profileImg,
    coverImg:user.coverImg
  })

 }catch(error){
  console.log('Error in login controller', error.message)
  res.status(500).json({error:"Internal username or password"})
 }
};


export const logout = async (req, res) => {
 try{
  res.cookie("jwt","",{maxAge:0})
  res.status(200).json({message:"Logged out successfully"})

 }catch(error){
  console.log("Error in logout eontroller",  error.message)
  res.status(500).json({error:"internal Server Error logout "})
 }
};

export const getMe = async(req,res)=>{
  try{
    const user = await User.findById(req.user._id).select('-password')
    res.status(200).json(user)

  }catch(error){
    console.log('Error in getMe controller',error.message)
    res.status(500).json({error:"Internal Server Error"})
  }
}
