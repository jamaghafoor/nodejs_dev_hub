const express = require("express");
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/ContactController");
const validateTokenHandler = require("../middlewares/ValidateTokenHandler");

const router = express.Router();
router.use(validateTokenHandler)
router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
