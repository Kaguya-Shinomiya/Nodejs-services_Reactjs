var express = require('express');
var router = express.Router();
let producerController = require('../controllers/producers')
var {CreateSuccessRes,CreateErrorRes} = require('../utils/ResHandler')


router.get('/', async function(req, res, next) {
    let categories = await producerController.GetAllProducer();
    CreateSuccessRes(res,200,categories);
});
router.get('/:id', async function(req, res, next) {
  try {
    let producer = await producerController.GetProducerById(req.params.id)
    CreateSuccessRes(res,200,producer);
  } catch (error) {
    CreateErrorRes(res,404,error);
  }
});
router.post('/', async function(req, res, next) {
    try {
      let body = req.body;
      if (!body.name || !body.phoneNumber || !body.email || !body.address) {
        return res.status(400).json({ message: "Name or phone number or email or address are required" });
      }

      let newCate = await producerController.CreateNewProducer(body);
      CreateSuccessRes(res,200,newCate);
    } catch (error) {
      next(error);
    }
})
router.put('/:id', async function(req, res, next) {
  
})



module.exports = router;
