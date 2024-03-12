import { hashPassword, passwordVerification,errorHandler } from "../utility/auth.utility.js";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'





const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password || email === "" || password === "") {
    return next(errorHandler(500, 'All fields are required'));
  }

  try {
    // Check if user already exists
    const existsUser = await User.findOne({ email: email });
    if (existsUser) {
      // return next(errorHandler(500, 'User already exists. Please use another email.'));
      return res.json({success:false,msg:'User already exists. Please use another email'})
    }

     // Check if username unique or not
     const existsUsername = await User.findOne({ username: username });
     if (existsUsername) {
       // return next(errorHandler(500, 'User already exists. Please use another email.'));
       return res.json({success:false,msg:'username already taken'})
     }

    // Validate password
    const verificationResult = passwordVerification(password);
    if (!verificationResult) {
      // return next(errorHandler(500, 'Invalid password! Password must be 8 characters long including one capital letter, special character, and number.'));
      return res.json({success:false,msg:'Invalid password! Password must be 8 characters long including one capital letter, special character, and number.'})
    }

    // Hash password
    const hashedPassword = hashPassword(password);
    if (!hashedPassword) {
      // return next(errorHandler(500, 'Something went wrong, please try again later'));
      return res.json({success:false,msg:'something went wrong'})
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save user to database
    const user = await newUser.save();
    if (user) {
      // Send response
      return res.status(201).json({success:true, msg: "Signup successful",});
    }
  } catch (error) {
    // Handle errors
    console.log(`User signup failed ${error}`);
    // return next(errorHandler(500, 'Something went wrong'));
    res.json({success:false,msg:'internal server error'})
  }
};


const login=async(req,res,next)=>{
  const{email,password}=req.body;

  if(!email || !password || email=='' || password==''){
    return res.json({success:false,msg:'all fields are required'})
  }

  try {
    const checkUser=await User.findOne({email:email})

    // check user exists or not
    if(!checkUser){
      return res.json({success:false,msg:'user not found'})
    }

    // verify password
    const verifyPassword=bcrypt.compareSync(password,checkUser.password)

    if(!verifyPassword){
      return res.json({success:false,msg:'invalid password'})
    }
    // genrate token---
    const token= jwt.sign({id:checkUser._id},process.env.JWT_SECRET_KEY)

     // Set cookie with HTTPOnly flag
  res.cookie('Token', token, { httpOnly: true });

  const{password:pass,...userData}=checkUser._doc

  res.json({success:true,msg:'login successfull',userData})
    
  } catch (error) {
    console.log(`login failed ${error}`)
    res.json({success:false,msg:'internal server error'})
  }
}


export { signup,login };
