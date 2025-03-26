var categorySchema = require('../schemas/category')
// var roleController = require('../controllers/roles')
// let bcrypt = require('bcrypt')

module.exports={
    GetAllCategory: async ()=>{
        return await categorySchema.find({});
    },
    GetCategoryById:async (id)=>{
        return await categorySchema.findById(id);
    },
    GetCategoryByName:async (name)=>{
        return await categorySchema.findOne({name: name});
    },
    CreateNewCategory: async (name, description) => {
        let cate_name = await categorySchema.findOne({ name: name }).exec();
        
        // Nếu danh mục đã tồn tại, báo lỗi
        if (cate_name) {
            throw new Error("This category name already exists. Please try another name.");
        }
    
        // Nếu chưa tồn tại, tạo danh mục mới
        let newCate = new categorySchema({
            name: name,
            description: description,
            isDelete: false
        });
    
        return await newCate.save();
    },
    UpdateCategory:async function(id,UpdateObj){
        if(UpdateObj.role){
            //
        }
    }
}