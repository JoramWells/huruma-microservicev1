const express = require('express');
const {
    addUser, getAllUsers, getUserById, editUser, deleteUser,
    login,
} = require('../../controllers/user/user.controller');

const router = express.Router();

router.post('/add', addUser);
router.post('/login', login);
router.get('/fetchAll', getAllUsers);
router.get('/detail/:id', getUserById);
router.put('/edit', editUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;
