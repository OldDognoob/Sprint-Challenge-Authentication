/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
//import
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET || "thesecret", (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "You shall not pass" });
      } else {
        req.decodedToken = decoded;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
};