const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

blogSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.createdAt = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
        delete ret.__v;
        return ret;
    }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
