const express = require('express');
const router = express.Router();

const {getUsers, getUserById, createUser, updateUserById, deleteUserById} = require('../controllers/users');

//* for all users
router.get('/users', getUsers).post('/users', createUser);

//* for specific user by ID
router.get('/users/:id', getUserById).patch('/users/:id', updateUserById).delete('/users/:id', deleteUserById);

module.exports = router;
