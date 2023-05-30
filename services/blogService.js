const Blog = require('../models/blog');

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

module.exports = BlogService;
