var blogSchema = require('../schemas/blog');

module.exports = {
    GetAllBlogs: async () => {
        return await blogSchema.find({ isDelete: false });
    },

    GetBlogById: async (id) => {
        return await blogSchema.findById(id);
    },

    GetBlogByTitle: async (title) => {
        return await blogSchema.findOne({ title: title });
    },

    CreateNewBlog: async (req, res) => {
        try {
            const { title, content, imageUrl, author } = req.body;
    
            const existingBlog = await blogSchema.findOne({ title });
            if (existingBlog) {
                return res.status(400).json({
                    message: "This blog title already exists. Please try another title."
                });
            }
    
            const newBlog = new blogSchema({
                title,
                content,
                imageUrl,
                author,
                isDelete: false
            });
    
            const savedBlog = await newBlog.save();
            res.status(201).json(savedBlog);
        } catch (err) {
            console.error("Error creating blog:", err.message);
            res.status(500).json({ message: err.message });
        }
    },
    

    UpdateBlog: async function (id, req) {
        const blog = await blogSchema.findById(id);
        if (!blog) {
            throw new Error("Blog not found");
        }
    
        const { title, content, imageUrl, author } = req.body;
    
        blog.title = title;
        blog.content = content;
        blog.imageUrl = imageUrl;
        blog.author = author;
        blog.updatedAt = new Date();
    
        return await blog.save();
    },  

    // DeleteBlog: async (id) => {
    //     const blog = await blogSchema.findById(id);
    //     if (!blog) {
    //         blog.isDelete = true;
    //         throw new Error("Blog not found");
    //     }
    
    //     await blogSchema.findByIdAndDelete(id); 
    //     return { message: "Blog deleted successfully" };
    // }


    DeleteBlog: async (id) => {
        const blog = await blogSchema.findById(id);
        if (!blog) {
            throw new Error("Blog not found");
        }
    
        blog.isDelete = true;
        blog.updatedAt = new Date();
        await blog.save();
    
        return { message: "Blog soft-deleted successfully" };
    }
};