const express = require('express');
const router = express.Router();

const Comment = require('./models/comment');
const Blog = require('./models/blog');

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

const commentService = new CommentService();

router.post('/', async (req, res) => {
    const { content, author, blog } = req.body;
    const comment = await commentService.createComment(content, author, blog);
    res.json(comment);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const comment = await commentService.getCommentById(id);
    res.json(comment);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const comment = await commentService.updateComment(id, updates);
    res.json(comment);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await commentService.deleteComment(id);
    res.sendStatus(204);
});

module.exports = router;
