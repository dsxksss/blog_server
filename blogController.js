const express = require('express');
const router = express.Router();
const Blog = require('./models/blog');

class BlogService {
    async createBlog(title, content, author) {
        const blog = new Blog({
            title,
            content,
            author
        });
        await blog.save();
        return blog;
    }

    async getBlogById(id) {
        const blog = await Blog.findById(id).populate('author').populate('comments');
        return blog;
    }

    async updateBlog(id, updates) {
        const blog = await Blog.findByIdAndUpdate(id, updates, { new: true });
        return blog;
    }

    async deleteBlog(id) {
        await Blog.findByIdAndDelete(id);
    }

    async getBlogs(page, limit) {
        const blogs = await Blog.find().skip((page - 1) * limit).limit(limit).populate('author').populate('comments');
        return blogs;
    }
}

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
