const express = require("express");
const { registerUser, loginUser, getUserById, updateUserById, deleteUserById } = require("../controllers/user");
const validateToken = require("../middleware/auth");

const router = express.Router();

//* route to make get and post request a.k.a create a new user
router.post("/register",registerUser).get("/register", registerUser);

//* route to search user by id, update user by id, and deleted user by id.
router.get('/register/:id', getUserById).patch('/register/:id', updateUserById).delete('/register/:id', deleteUserById);

//* login endpoint
router.post("/login", loginUser);

//? details of current user. Need to work on it.
router.get("/current", validateToken);


module.exports = router;