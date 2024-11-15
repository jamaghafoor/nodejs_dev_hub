const express = require("express");
const {
  getUser,
  createUser,
  loginUser,
} = require("../controllers/UserController");
const validateTokenHandler = require("../middlewares/ValidateTokenHandler");
const router = express.Router();

router.get("/current", validateTokenHandler, getUser);
router.post("/register", createUser);
router.post("/login", loginUser)

module.exports = router;
