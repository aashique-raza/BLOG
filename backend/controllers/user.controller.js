import {
  hashPassword,
  passwordVerification,
  errorHandler,
} from "../utility/auth.utility.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const testApi = (req, res) => {
  res.json({ msg: "api is working" });
};

const updateUser = async (req, res) => {
  const { username, email, password, profilePicture } = req.body;
  // console.log(username,email,password,profilePicture)

  // Check if the user is authorized to update this user
  if (req.user.id !== req.params.userId) {
    return res
      .status(401)
      .json({ success: false, msg: "You are not allowed to update this user" });
  }

  try {
    let hashedPassword;
    if (password) {
      console.log(password);
      // Validate and hash the password
      const validatePassword = passwordVerification(password);
      if (!validatePassword) {
        return res.status(400).json({
          success: false,
          msg: "Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character.",
        });
      }
      //   hash passwored--
     hashedPassword = hashPassword(password);
    }

    
    // console.log(hashedPassword)

    if (username) {
      // Validate username
      if (username.length < 7 || username.length > 20) {
        return res
          .status(400)
          .json({
            success: false,
            msg: "Username must be between 7 and 20 characters",
          });
      }
      if (username.includes(" ")) {
        return res
          .status(400)
          .json({ success: false, msg: "Username cannot contain spaces" });
      }
      if (username !== username.toLowerCase()) {
        return res
          .status(400)
          .json({ success: false, msg: "Username must be lowercase" });
      }
      if (!username.match(/^[a-zA-Z0-9]+$/)) {
        return res
          .status(400)
          .json({
            success: false,
            msg: "Username can only contain letters and numbers",
          });
      }
    }

    // Update user information
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: username,
          email: email,
          profilePicture: profilePicture,
          password: hashedPassword,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    // Remove password from user data
    const { password: hashingPassword, ...userData } = updatedUser._doc;

    // Send success response
    return res
      .status(200)
      .json({ success: true, msg: "User updated successfully", userData });
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal server error" });
  }
};

export { testApi, updateUser };
