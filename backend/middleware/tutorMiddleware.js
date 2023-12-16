import jwt from "jsonwebtoken";
import Tutor from "../models/tutorModel.js";
const secret = 1234;


const tutorauthcheck =  async (req, res, next) => {

  const token = req.headers.authorization;
  if (token) {
   
    try {
      // Remove the "Bearer " prefix from the token (if present)
      const tokenWithoutBearer = token.replace("Bearer ", "");
      
      const decoded = jwt.verify(tokenWithoutBearer, 1234);
      

      // Fetch user details and attach to the request
      req.user = await Tutor.findById(decoded.tutorId).select('-password');

      
      next();
    } catch (error) {
      
      res.status(401).json(error)
      
    }
  } else {
    res.status(401).json('error')
   
  }
};

export default tutorauthcheck;