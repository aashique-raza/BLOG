import { hashPassword, passwordVerification } from "../utility/auth.utility.js";
import User from "../models/user.model.js";

const sigunp = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    email == "" ||
    password == "" ||
    email == ""
  ) {
    return res.status(402).json({ msg: "all fields are required" });
  }

  try {
    const existsUser = await User.findOne({ email: email });
    const verificationResult = passwordVerification(password);
    if (!verificationResult)
      return res.status(402).json({ msg: "invalid password" });

    const hashedPassword = hashPassword(password);
    if (!hashedPassword)
      return res.status(502).json({ msg: "something went wrong" });
    if (existsUser)
      return res
        .status(402)
        .json({ msg: "email already exists use another email!" });
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
    res.status(500).json({ msg: "something went wrong" });
  }
};

export { sigunp };
