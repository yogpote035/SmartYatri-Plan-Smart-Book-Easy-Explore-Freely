const express = require("express");
const router = express.Router();
const {
  Signup,
  Login,
} = require("../../controllers/UserController/UserAuthentication");

router.post("/signup", Signup);
router.post("/login", Login);

module.exports = router;
