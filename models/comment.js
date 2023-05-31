const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }
});

commentSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.createdAt = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
        delete ret.__v;
        return ret;
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
