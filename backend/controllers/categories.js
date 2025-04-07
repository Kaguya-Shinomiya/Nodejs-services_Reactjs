var categorySchema = require('../schemas/category')
// var roleController = require('../controllers/roles')
// let bcrypt = require('bcrypt')

module.exports = {
    GetAllCategory: async () => {
        return await categorySchema.find({});
    },
    GetCategoryById: async (id) => {
        return await categorySchema.findById(id);
    },
    GetCategoryByName: async (name) => {
        return await categorySchema.findOne({ name: name });
    },
    CreateNewCategory: async (name, description) => {
        let cate_name = await categorySchema.findOne({ name: name }).exec();

        if (cate_name) {
            // throw new Error("This category name already exists. Please try another name.");
            return res.status(400).json({ message: "This category name already exists. Please try another name." });
        }

        let newCate = new categorySchema({
            name: name,
            description: description,
            isDelete: false
        });

        return await newCate.save();
    },
    UpdateCategory: async function (id, body, res) {
        let allowFields = ["name", "description"];
        let category = await categorySchema.findById(id);
        if (category) {
            let cate_name = await categorySchema.findOne({ name: body.name }).exec();
            if (cate_name && category.name != body.name) {
                return res.status(400).json({ message: "This category name have already exists. Please try another name." });
            }
            for (const key of Object.keys(body)) {
                if (allowFields.includes(key)) {
                    category[key] = body[key]
                }
            }
            category.isDelete = false;

            return await category.save();
        }
    },

    deleteCategory: async (id) => {
        let category = await categorySchema.findById(id);
        if (category) {
            category.isDelete = true;
            return await category.save();
        }
    }
}