var express = require('express');
var log_admin = require('../utils/logger');
var router = express.Router();
let producerController = require('../controllers/producers')
var {CreateSuccessRes,CreateErrorRes} = require('../utils/ResHandler')
let {check_authentication,check_authorization} = require('../utils/check_auth')
let constants = require('../utils/constants')

router.get('/', async function(req, res, next) {
    let categories = await producerController.GetAllProducer();
    CreateSuccessRes(res,200,categories);
});
router.get('/:id', async function(req, res, next) {
  try {
    let producer = await producerController.GetProducerById(req.params.id)
    CreateSuccessRes(res,200,producer);
  } catch (error) {
    log_admin.error(`Lỗi khi lấy nhà sản xuất theo id: ${req.params.id}`);
    CreateErrorRes(res,404,error);
  }
});
router.post('/', check_authentication,check_authorization(constants.ADMIN_PERMISSION), async function(req, res, next) {
    try {
      let body = req.body;
      if (!body.name || !body.phoneNumber || !body.email || !body.address) {
        return res.status(400).json({ message: "Name or phone number or email or address are required" });
      }

      let newCate = await producerController.CreateNewProducer(body);
      CreateSuccessRes(res,200,newCate);
    } catch (error) {
      log_admin.error(`Lỗi khi thêm nhà sản xuất: ${req.body}`);
      next(error);
    }
})
router.put('/:id', check_authentication,check_authorization(constants.ADMIN_PERMISSION),async function(req, res, next) {
  try {
      let producer = await producerController.UpdateProducer(req.params.id,req.body,res);
      CreateSuccessRes(res,200,producer);
    } catch (error) {
      log_admin.error(`Lỗi khi sửa nhà sản xuất theo id: : (${req.params.id}), ${req.body}`);
      next(error);
    }
})

router.delete('/:id', check_authentication,check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
  try {
    let body = req.body;
    let deleteproducer = await producerController.deleteProducer(req.params.id, body);
    CreateSuccessRes(res, 200, deleteproducer);
  } catch (error) {
    log_admin.error(`Lỗi khi xóa nhà sản xuất theo id: : (${req.params.id})`);
    next(error);
  }
})



module.exports = router;
