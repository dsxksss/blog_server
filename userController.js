const express = require('express');
const router = express.Router();
const User = require('./models/user');

class UserService {
    async createUser(name, email, password) {
        const user = new User({
            name,
            email,
            password
        });
        await user.save();
        return user;
    }

    async getUserById(id) {
        const user = await User.findById(id);
        return user;
    }

    async updateUser(id, updates) {
        const user = await User.findByIdAndUpdate(id, updates, { new: true });
        return user;
    }

    async deleteUser(id) {
        await User.findByIdAndDelete(id);
    }

    async getUsers(page, limit) {
        const users = await User.find().skip((page - 1) * limit).limit(limit);
        return users;
    }
}

const userService = new UserService();

router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
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
