const Comment = require('../models/comment');
const Blog = require('../models/blog');
const BlogService = require('./blogService');

class CommentService {
    async createComment(content, author, blog) {
        const comment = new Comment({
            content,
            author,
            blog
        });
        const blogData = await Blog.findById(blog);
        await comment.save();
        blogData.comments.push(comment.id);
        await blogData.save();
        return comment;
    }

    async getCommentById(id) {
        const comment = await Comment.findById(id).populate('author').populate('blog');
        return comment;
    }

    async updateComment(id, updates) {
        const comment = await Comment.findByIdAndUpdate(id, updates, { new: true });
        return comment;
    }

    async deleteComment(id) {
        await Comment.findByIdAndDelete(id);
    }
}

module.exports = CommentService;
