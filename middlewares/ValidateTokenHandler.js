const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validateTokenHandler = asyncHandler(async (req, res, next) => {
  const authHeaderToken = req.headers.Authorization || req.headers.authorization;
  console.log("Authorization: ", req.headers)
  let token;
  if (authHeaderToken && authHeaderToken?.startsWith("Bearer")) {
    token = authHeaderToken.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOEKN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not autherized.");
      }
      req.user = decoded.user;
      console.log("decoded.user: ", decoded.user)
      next();
    });
    if (!token) {
      res.status(401);
      throw new Error("User is not autherized or missing authorization token.");
    }
  }

});

module.exports = validateTokenHandler;
