import { hashPassword, passwordVerification,errorHandler } from "../utility/auth.utility.js";
import User from "../models/user.model.js";

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
      return res.status(201).json({success:true, msg: "Signup successful", ...user._doc });
    }
  } catch (error) {
    // Handle errors
    console.log(`User signup failed ${error}`);
    // return next(errorHandler(500, 'Something went wrong'));
    res.json({success:false,msg:'internal server error'})
  }
};


export { signup };
