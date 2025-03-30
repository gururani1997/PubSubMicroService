const jwt = require("jsonwebtoken");

exports.authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  // If no token is provided, return 401
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // now Verify the JWT token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log("Inside error here:::", err);
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    console.log("Inside success here:::", user);
    req.user = user;
    next();
  });
};
