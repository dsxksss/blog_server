const User = require('../models/user');

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

module.exports = UserService;
