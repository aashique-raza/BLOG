import { hashPassword, passwordVerification,errorHandler } from "../utility/auth.utility.js";
import User from "../models/user.model.js";

const sigunp = async (req, res,next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    email == "" ||
    password == "" ||
    email == ""
  ) {
    next(errorHandler(402,'all fields are required'))
    // return res.status(402).json({ msg: "all fields are required" });
  }

  try {
    const existsUser = await User.findOne({ email: email });
    const verificationResult = passwordVerification(password);
    if (!verificationResult){
        next(errorHandler(402,'invalid password! password must be 8 char inclufing one capital letter, special char and number'))
        //   return res.status(402).json({ msg: "invalid password" });
    }
    
    

    const hashedPassword = hashPassword(password);
    if (!hashedPassword){
        next(errorHandler(500,'something went wrong,please try again later'))

        // return res.status(502).json({ msg: "something went wrong" });
    }
      
    if (existsUser){
        // return res
        //   .status(402)
        //   .json({ msg: "email already exists use another email!" });
        next(errorHandler(402,'user already exists use another email!'))
    }
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    if (user) {
      res.status(201).json({ msg: "signup successfull", ...user._doc });
    }
  } catch (error) {
    console.log(`user signup failed ${error}`);
    // res.status(500).json({ msg: "something went wrong" });
    next(error)
  }
};

export { sigunp };
