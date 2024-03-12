import jwt from 'jsonwebtoken';
// import { errorHandler } from './error.js';
const verifyToken = async (req, res, next) => {
    try {
      const token = req.cookies.Token;
      if (!token) {
        return res.status(401).json({ success: false, msg: 'Unauthorized' });
      }
  
      const decodedUser = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  
      if (!decodedUser) {
        return res.status(401).json({ success: false, msg: 'Unauthorized' });
      }
  
      // If token is verified successfully, set the decoded user in the request object
      req.user = decodedUser;
      next();
    } catch (error) {
      // Handle any errors that occur during token verification
      console.error('Token verification error:', error);
      return res.status(500).json({ success: false, msg: 'Internal Server Error' });
    }
  };
  

export default verifyToken