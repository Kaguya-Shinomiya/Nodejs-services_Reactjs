var express = require('express');
var log_admin = require('../utils/logger');
var router = express.Router();
let roleController = require('../controllers/roles')
var {CreateSuccessRes,CreateErrorRes} = require('../utils/ResHandler')
let {check_authentication,check_authorization} = require('../utils/check_auth')
let constants = require('../utils/constants')


router.get('/', async function(req, res, next) {
    let users = await roleController.GetAllRole();
    CreateSuccessRes(res,200,users);
});
router.get('/:id', async function(req, res, next) {
  try {
    let user = await roleController.GetRoleById(req.params.id)
    CreateSuccessRes(res,200,user);
  } catch (error) {
    log_admin.error(`Lỗi khi lấy role theo id: ${req.params.id}`);
    next(error);
  }
});
router.post('/', check_authentication,check_authorization(constants.ADMIN_PERMISSION),async function(req, res, next) {
  try {
    let newRole = await roleController.CreateRole(req.body.name);
    CreateSuccessRes(res,200,newRole);
  } catch (error) {
    log_admin.error(`Lỗi khi thêm role: ${req.body}`);
    next(error);
  }
});

router.put('/:id', check_authentication,check_authorization(constants.ADMIN_PERMISSION), async function(req, res, next) {
  try {
    let newRole = await roleController.UpdateRole(req.body.id,req.body.name);
    CreateSuccessRes(res,200,newRole);
  } catch (error) {
    log_admin.error(`Lỗi khi sửa role theo id: : (${req.params.id}), ${req.body}`);
    next(error);
  }
});

router.delete('/:id',check_authentication,check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
  try {
    let deleteRole = await roleController.DeleteRole(req.params.id);
    CreateSuccessRes(res, 200, deleteRole);
  } catch (error) {
     log_admin.error(`Lỗi khi xóa role theo id: : (${req.params.id})`);
    next(error);
  }
})





module.exports = router;
