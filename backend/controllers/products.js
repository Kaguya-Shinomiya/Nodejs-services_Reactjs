var productSchema = require('../schemas/product')
var categorySchema = require('../schemas/category')
var producerSchema = require('../schemas/producer')
var product_ImageSchema = require('../schemas/product_Image')
var categoryController = require('../controllers/categories')
// let bcrypt = require('bcrypt')



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
        //return await productSchema.findById(id);
        try {
            // Tìm sản phẩm dựa theo ID
            let product = await productSchema
                .findById(id)
                .populate({ path: "categoryId", select: "name" }) // Đảm bảo "name" tồn tại trong categorySchema
                .populate({ path: "producerId", select: "name" })
                .lean();

            if (!product) return null;

            // Tìm danh sách ảnh của sản phẩm
            const images = await product_ImageSchema.find({ productId: id });

            return {
                ...product,
                images: images || [] // Đảm bảo có mảng ảnh, không bị null
            };
        } catch (error) {
            console.error("Lỗi khi lấy sản phẩm:", error);
            return null;
        }
    },
    CreateNewProduct: async (req, res) => {
        try {
            //console.log("Đã vô được CreateNewProduct  hehehe");
            const fs = require("fs");
            const path = require("path");

            const uploadDir = path.join(__dirname, "../public/images");
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            const body = req.body;

            // Kiểm tra danh mục tồn tại
            const categoryExists = await categorySchema.findById(body.categoryId);
            if (!categoryExists) {
                return res.status(400).json({ error: "Category not found. Please provide a valid categoryId." });
            }

            // Kiểm tra nhà sản xuất tồn tại
            const producerExists = await producerSchema.findById(body.producerId);
            if (!producerExists) {
                return res.status(400).json({ error: "Producer not found. Please provide a valid producerId." });
            }

            // Kiểm tra và xử lý ảnh (Chỉ hoạt động nếu có `req.files`)
            let imagePaths = [];
            
            if (req.files && req.files.images) {
                
                const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

                for (let i = 0; i < images.length; i++) {
                    const image = images[i];
                    const fileName = `${Date.now()}_${image.name}`;
                    const filePath = path.join(uploadDir, fileName);

                    await image.mv(filePath); // Lưu ảnh vào thư mục

                    imagePaths.push(`images/${fileName}`); // Lưu đường dẫn ảnh
                }
            }

            // Tạo sản phẩm mới
            let newProduct = new productSchema({
                productName: body.productName,
                price: body.price,
                old_price: body.old_price,
                description: body.description || "",
                imageUrl: imagePaths.length > 0 ? imagePaths[0] : null, // Ảnh đầu tiên
                categoryId: body.categoryId,
                producerId: body.producerId,
                stockQuantity: body.stockQuantity,
                isPreOrder: body.isPreOrder,
                releaseDate: body.releaseDate || null,
                isNewProduct: body.isNew || false,
                sold: body.sold || 0,
            });

            const savedProduct = await newProduct.save();

            // Lưu ảnh còn lại vào bảng product_images
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

    UpdateProduct: async function (id, UpdateObj) {
        if (UpdateObj.role) {
            //
        }
    }
}