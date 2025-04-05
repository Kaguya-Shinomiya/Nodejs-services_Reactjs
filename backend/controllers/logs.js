var logSchema = require('../schemas/log')


module.exports = {
    GetAllLogs: async () => {
        return await logSchema.find({});
    },


    GetLogByName: async (name) => {
        return await logSchema.findOne({ name: name });
    },
    CreateNewLog: async (name) => {

        let newLog = new logSchema({
            name: name,
            isDelete: false
        });
        return await newLog.save();
    },

    UpdateLog: async function (id, body) {
        let allowFields = ["name"];
        let log = await logSchema.findById(id);
        if (log) {
            for (const key of Object.keys(body)) {
                if (allowFields.includes(key)) {
                    log[key] = body[key]
                }
            }
            return await log.save();
        }
    },
    DeleteLog: async function (name) {
        return logSchema.deleteOne({ name: name });
    },
    DeleteLogBool: async function (name) {
        let log = GetLogByName(name);
        if (log) {
            log.isDelete = true;
            return await log.save();
        }
    }
}