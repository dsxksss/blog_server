const express = require('express');
const BlogService = require('../services/blogService');

const router = express.Router();
const blogService = new BlogService();

router.post('/', async (req, res) => {
    const { title, content, author } = req.body;
    const blog = await blogService.createBlog(title, content, author);
    res.json(blog);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const blog = await blogService.getBlogById(id);
    res.json(blog);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const blog = await blogService.updateBlog(id, updates);
    res.json(blog);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await blogService.deleteBlog(id);
    res.sendStatus(204);
});

router.get('/', async (req, res) => {
    const { page, limit } = req.query;
    const blogs = await blogService.getBlogs(page, limit);
    res.json(blogs);
});

module.exports = router;
