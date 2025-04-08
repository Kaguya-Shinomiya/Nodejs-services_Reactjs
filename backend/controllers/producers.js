var producerSchema = require('../schemas/producer')

module.exports = {
    GetAllProducer: async () => {
        return await producerSchema.find({});
    },
    GetProducerById: async (id) => {
        return await producerSchema.findById(id);
    },
    GetProducerByName: async (name) => {
        return await producerSchema.findOne({ name: name });
    },
    CreateNewProducer: async (body) => {
        let producer = await producerSchema.findOne({ name: body.name }).exec();

        console.log("bbbbbbbb")
        if (producer) {
            return res.status(400).json({ message: "This producer name have already exists. Please try another name." })
        }

        console.log("aaaaa")

        let newProcer = new producerSchema({
            name: body.name,
            description: body.description,
            address: body.address,
            phoneNumber: body.phoneNumber,
            email: body.email,
            isDelete: false
        });

        return await newProcer.save();
    },
    UpdateProducer: async function (id, body, res) {
        let allowFields = ["name", "description","address","phoneNumber","email"];
        let producer = await producerSchema.findById(id);
        if (producer) {
            let producer_name = await producerSchema.findOne({ name: body.name }).exec();
            if (producer_name && producer.name != body.name) {
                return res.status(400).json({ message: "This producer name have already exists. Please try another name." });
            }
            for (const key of Object.keys(body)) {
                if (allowFields.includes(key)) {
                    producer[key] = body[key]
                }
            }
            producer.isDelete = false;

            return await producer.save();
        }
    },

    deleteProducer: async (id) => {
        let producer = await producerSchema.findById(id);
        if (producer) {
            producer.isDelete = true;
            return await producer.save();
        }
    }
}