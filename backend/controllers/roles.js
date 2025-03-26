var roleSchema = require('../schemas/role')

module.exports={
    GetAllRole: async ()=>{
        return await roleSchema.find({});
    },
    GetRoleById:async (id)=>{
        return await roleSchema.findById(id);
    },
    GetRoleByName:async (name)=>{
        return await roleSchema.findOne({
            name:name
        });
    },
    CreateRole: async (name)=>{
        let newRole = new roleSchema({
            name:name
        });
        return await newRole.save()
    },
    UpdateRole: async (id, body)=>{
        let allowFields = ["name", "description"];
        let role = await roleSchema.findById(id);
        if (role) {
            for (const key of Object.keys(body)) {
                if (allowFields.includes(key)) {
                    role[key] = body[key]
                }
            }
            return await role.save();
        }
    },
    DeleteRole: async (id)=>{
        let role = await roleSchema.findById(id);
        if(role){
            role.isDelete= true;
            return await role.save();
        }
    }
}
