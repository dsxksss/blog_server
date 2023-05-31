const express = require('express');
const UserService = require('../services/userService');

const router = express.Router();
const userService = new UserService();

router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    const user = await userService.createUser(name, email, password);
    res.json(user);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.json(user);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const user = await userService.updateUser(id, updates);
    res.json(user);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.sendStatus(204);
});

router.get('/', async (req, res) => {
    const { page, limit } = req.query;
    const users = await userService.getUsers(page, limit);
    res.json(users);
});

module.exports = router;
