const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.createdAt = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
        delete ret.__v;
        return ret;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;