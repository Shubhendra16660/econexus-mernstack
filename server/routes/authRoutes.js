const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController"); // ✅ FIX
const { validateRegister } = require("../validators/authValidator"); 
router.post("/register", validateRegister, registerUser);


router.post("/login", loginUser); // ✅ FIX

module.exports = router;