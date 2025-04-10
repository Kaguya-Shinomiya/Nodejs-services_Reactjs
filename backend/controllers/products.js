var productSchema = require('../schemas/product')
var categorySchema = require('../schemas/category')
var producerSchema = require('../schemas/producer')
var product_ImageSchema = require('../schemas/product_Image')
var categoryController = require('../controllers/categories')

module.exports = {
    GetAllProduct: async () => {
        return await productSchema.find({});
    },
    GetCategoryOfProduct: async (category_name) => {
        var cate_name = await categoryController.GetCategoryByName(category_name)
        return await productSchema.find({ categoryId: cate_name._id });
    },
    GetBestSellerProduct: async () => {
        return await productSchema.find({ sold: { $gt: 100 } });
    },

    GetProductById: async (id) => {
        try {
            let product = await productSchema
                .findById(id)
                .populate({ path: "categoryId", select: "name" })
                .populate({ path: "producerId", select: "name" })
                .lean();

            if (!product) return null;

            const images = await product_ImageSchema.find({ productId: id });

            return {
                ...product,
                images: images || [] 
            };
        } catch (error) {
            console.error("Lỗi khi lấy sản phẩm:", error);
            return null;
        }
    },
    CreateNewProduct: async (req, res) => {
        try {
            const fs = require("fs");
            const path = require("path");

            const uploadDir = path.join(__dirname, "../public/images");
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            const body = req.body;

            const categoryExists = await categorySchema.findById(body.categoryId);
            if (!categoryExists) {
                return res.status(400).json({ error: "Category not found. Please provide a valid categoryId." });
            }

            const producerExists = await producerSchema.findById(body.producerId);
            if (!producerExists) {
                return res.status(400).json({ error: "Producer not found. Please provide a valid producerId." });
            }

            let imagePaths = [];

            if (req.files && req.files.images) {

                const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

                for (let i = 0; i < images.length; i++) {
                    const image = images[i];
                    const fileName = `${Date.now()}_${image.name}`;
                    const filePath = path.join(uploadDir, fileName);

                    await image.mv(filePath); 

                    imagePaths.push(`images/${fileName}`); 
                }
            }

            let newProduct = new productSchema({
                productName: body.productName,
                price: body.price,
                old_price: body.old_price,
                description: body.description || "",
                imageUrl: imagePaths.length > 0 ? imagePaths[0] : null,
                categoryId: body.categoryId,
                producerId: body.producerId,
                stockQuantity: body.stockQuantity,
                isPreOrder: body.isPreOrder,
                releaseDate: body.releaseDate || null,
                isNewProduct: body.isNew || false,
                sold: body.sold || 0,
            });

            const savedProduct = await newProduct.save();

            if (imagePaths.length > 1) {
                const productImages = imagePaths.slice(1).map((url) => ({
                    productId: savedProduct._id,
                    imageUrl: url,
                }));

                await product_ImageSchema.insertMany(productImages);
            }

            res.status(201).json(savedProduct);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },

    UpdateProduct: async function (id, req) {
        const fs = require("fs");
        const path = require("path");
        const uploadDir = path.join(__dirname, "../public/images");

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const body = req.body;

        let product = await productSchema.findById(id);
        if (!product) {
            throw new Error(`Can't find product with id: ${id}`);
        }

        const categoryExists = await categorySchema.findById(body.categoryId);
        if (!categoryExists) {
            throw new Error("Category not found. Please provide a valid categoryId.");
        }

        const producerExists = await producerSchema.findById(body.producerId);
        if (!producerExists) {
            throw new Error("Producer not found. Please provide a valid producerId.");
        }


        let imagePaths = [];

        if (req.files && req.files.images) {
            const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

            for (const image of images) {
                const fileName = `${Date.now()}_${image.name}`;
                const filePath = path.join(uploadDir, fileName);
                await image.mv(filePath);
                imagePaths.push(`images/${fileName}`);
            }
        }

        const allowedFields = [
            'productName',
            'price',
            'old_price',
            'description',
            'categoryId',
            'producerId',
            'stockQuantity',
            'isPreOrder',
            'releaseDate',
            'isNew',
            'sold'
        ];

        const updateFields = {};

        for (const key of allowedFields) {
            if (body[key] !== undefined) {
                updateFields[key] = body[key];
            }
        }

        updateFields.description = body.description || '';
        updateFields.releaseDate = body.releaseDate || null;
        updateFields.isNewProduct = body.isNew || false;
        updateFields.sold = body.sold || 0;
        updateFields.isDelete = false;

        if (imagePaths.length > 0) {
            updateFields.imageUrl = imagePaths[0];
        }

        const updatedProduct = await productSchema.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true }
        );

        if (imagePaths.length > 1) {
            await product_ImageSchema.deleteMany({ productId: id });

            const productImages = imagePaths.slice(1).map((url) => ({
                productId: id,
                imageUrl: url,
            }));

            await product_ImageSchema.insertMany(productImages);
        }

        return updatedProduct;
    },
    DeleteProduct: async (id) => {
        let product = await productSchema.findById(id);
        if (product) {
            product.isDelete = true;
            return await product.save();
        }
    }

}