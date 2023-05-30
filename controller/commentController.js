const express = require('express');
const CommentService = require('../services/commentService');

const router = express.Router();
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
