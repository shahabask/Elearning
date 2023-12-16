import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";
const secret = '1234';


const adminauthcheck =  async (req, res, next) => {


  // Retrieve the token from the "Authorization" header
  const token = req.headers.authorization;

  if (token) {
    try {
      // Remove the "Bearer " prefix from the token (if present)
      const tokenWithoutBearer = token.replace("Bearer ", "");

      // Verify the token
      const decoded = jwt.verify(tokenWithoutBearer, '1234');

      // Fetch user details and attach to the request
      req.user = await Admin.findById(decoded.adminId).select('-password');

      next();
    } catch (error) {
    
      res.status(401).json(error)
      
    }
  } else {
    res.status(401).json(error)
    
  }
};

export default adminauthcheck;