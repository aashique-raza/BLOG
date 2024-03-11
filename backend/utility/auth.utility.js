import bcrypt from "bcrypt";

const hashPassword = (password) => {
  const hashedPassword = bcrypt.hashSync(password, 10);

  return hashedPassword;
};

const uppercaseRegex = /[A-Z]/;
const numberRegex = /[0-9]/;
const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

const passwordVerification = (password) => {
  if (
    password.length < 8 ||
    !uppercaseRegex.test(password) ||
    !numberRegex.test(password) ||
    !specialCharRegex.test(password)
  ) {
    // return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character.' });

    return false;
  }

  return true;
};

 const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
  };

export { hashPassword, passwordVerification,errorHandler };
