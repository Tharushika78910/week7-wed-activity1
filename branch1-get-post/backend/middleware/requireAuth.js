// backend/middleware/requireAuth.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const authHeader = req.headers.authorization;

  // no header OR wrong format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // make sure your login/signup uses: jwt.sign({ _id: user._id }, process.env.SECRET, ...)
    const { _id } = jwt.verify(token, process.env.SECRET);

    const user = await User.findById(_id).select("_id name");
    if (!user) {
      return res.status(401).json({ error: "Request is not authorized" });
    }

    // attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
