var express = require('express');
var log_admin = require('../utils/logger');
var router = express.Router();
let categoryController = require('../controllers/categories')
var {CreateSuccessRes,CreateErrorRes} = require('../utils/ResHandler')
let {check_authentication,check_authorization} = require('../utils/check_auth')
let constants = require('../utils/constants')

router.get('/', async function(req, res, next) {
    let categories = await categoryController.GetAllCategory();
    CreateSuccessRes(res,200,categories);
});
router.get('/:id', async function(req, res, next) {
  try {
    let category = await categoryController.GetCategoryById(req.params.id)
    CreateSuccessRes(res,200,category);
  } catch (error) {
    log_admin.error(`Lỗi khi lấy danh mục theo id: ${req.params.id}`);
    CreateErrorRes(res,404,error);
  }
});
router.post('/', check_authentication,check_authorization(constants.ADMIN_PERMISSION), async function(req, res, next) {
    try {
      let body = req.body;
      if (!body.name) {
        return res.status(400).json({ message: "Name are required" });
      }

      let newCate = await categoryController.CreateNewCategory(body.name, body.description);
      CreateSuccessRes(res,200,newCate);
    } catch (error) {
      log_admin.error(`Lỗi khi thêm danh mục: ${req.body}`);
      next(error);
    }
})
router.put('/:id', check_authentication,check_authorization(constants.ADMIN_PERMISSION), async function(req, res, next) {
  try {
      let category = await categoryController.UpdateCategory(req.params.id,req.body,res);
      CreateSuccessRes(res,200,category);
    } catch (error) {
      log_admin.error(`Lỗi khi sửa danh mục theo id: : (${req.params.id}), ${req.body}`);
      next(error);
    }
})

router.delete('/:id', check_authentication,check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
  try {
    let deleteCategory = await categoryController.deleteCategory(req.params.id);
    CreateSuccessRes(res, 200, deleteCategory);
  } catch (error) {
    log_admin.error(`Lỗi khi xóa danh mục theo id: : (${req.params.id})`);
    next(error);
  }
})


module.exports = router;
