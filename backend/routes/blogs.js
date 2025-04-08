var express = require('express');
var router = express.Router();
var blogController = require('../controllers/blogs');
var { CreateSuccessRes, CreateErrorRes } = require('../utils/ResHandler');

router.get("/", async (req, res, next) => {
    try {
        let blogs = await blogController.GetAllBlogs();
        CreateSuccessRes(res, 200, blogs);
    } catch (error) {
        CreateErrorRes(res, 500, error.message);
    }
});

router.get('/category/:category', async (req, res, next) => {
    try {
        const blogs = await blogController.GetBlogsByCategory(req.params.category);
        CreateSuccessRes(res, 200, blogs);
    } catch (error) {
        CreateErrorRes(res, 500, error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const blog = await blogController.GetBlogById(req.params.id);
        if (!blog) return CreateErrorRes(res, 404, "Blog not found");
        CreateSuccessRes(res, 200, blog);
    } catch (error) {
        CreateErrorRes(res, 500, error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        if (!body.title || !body.content || !body.author) {
            return res.status(400).json({
                message: "title, content, and author are required"
            });
        }

        await blogController.CreateNewBlog(req, res);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const body = req.body;
        if (!body.title || !body.content || !body.author) {
            return res.status(400).json({
                message: "title, content, and author are required"
            });
        }

        const updatedBlog = await blogController.UpdateBlog(req.params.id, req);
        return res.status(200).json(updatedBlog);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedBlog = await blogController.DeleteBlog(req.params.id);
        CreateSuccessRes(res, 200, deletedBlog);
    } catch (error) {
        next(error);
    }
});


module.exports = router;
