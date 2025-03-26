var producerSchema = require('../schemas/producer')

module.exports={
    GetAllProducer: async ()=>{
        return await producerSchema.find({});
    },
    GetProducerById:async (id)=>{
        return await producerSchema.findById(id);
    },
    GetProducerByName:async (name)=>{
        return await producerSchema.findOne({name: name});
    },
    CreateNewProducer: async (body) => {
        let cate_name = await producerSchema.findOne({ name: body.name }).exec();
        
        // Nếu danh mục đã tồn tại, báo lỗi
        if (cate_name) {
            throw new Error("This producer name already exists. Please try another name.");
        }
    
        // Nếu chưa tồn tại, tạo danh mục mới
        let newCate = new producerSchema({
            name: body.name,
            description: body.description,
            address: body.address,
            phoneNumber: body.phoneNumber,
            email: body.email,
            isDelete: false
        });
    
        return await newCate.save();
    },
    UpdateProducer:async function(id,UpdateObj){
        if(UpdateObj.role){
            //
        }
    }
}