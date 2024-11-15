const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModels");

//@desc Get User
//@route GET /api/user/profile
//@access public
const getUser = asyncHandler(async (request, response) => {
  const user = request.user;

  if (!user) {
    response.status(404);
    throw new Error("User not found!");
  }
  response.status(200).json(user);
});

//@desc  Create user
//@route POST /api/user/register
//@access public
const createUser = asyncHandler(async (request, response) => {
  const { username, email, password } = request.body;
  if (!username || !email || !password) {
    response.status(404);
    throw new Error("All the fields are required.");
  }
  const userAvailable = await User.findOne({
    email,
  });
  if (userAvailable) {
    response.status(400);
    throw new Error("User is already registered.");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (!user) {
    response.status(400);
    throw new Error("Provided user data is not valid.");
  }
  response.status(201).json({
    email: user?.email,
    id: user?.id,
  });
});

//@desc  Login user
//@route POST /api/user/login
//@access public
const loginUser = asyncHandler(async (request, response) => {
  
  const { email, password } = request.body;
  if (!email || !password) {
    response.status(400);
    throw new Error("All the fields are required.");
  }
  const user = await User.findOne({
    email,
  });
  if (user && bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        }
      },
      process.env.ACCESS_TOEKN_SECRET,
      {
        expiresIn: "15m",
      }
    );
    response.status(200).json({
      accessToken,
      user: {
        username: user.username,
        email: user.email,
        id: user.id,
      },
    });
  } else {
    response.status(400);
    throw new Error("Email or Password is invalid.");
  }
});

module.exports = {
  getUser,
  createUser,
  loginUser,
};
