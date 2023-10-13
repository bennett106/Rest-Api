const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/newUser");
const validateToken = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current",validateToken ,currentUser);

module.exports = router;