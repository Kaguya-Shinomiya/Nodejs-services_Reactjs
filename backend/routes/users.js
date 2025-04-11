var express = require('express');
var router = express.Router();
var log_admin = require('../utils/logger');
let userController = require('../controllers/users')
var { CreateSuccessRes, CreateErrorRes } = require('../utils/ResHandler')
let {check_authentication,check_authorization} = require('../utils/check_auth')
let constants = require('../utils/constants')


router.get('/',check_authentication,check_authorization(constants.MOD_PERMISSION), async function (req, res, next) {
  try {
    let users = await userController.GetAllUser();
    CreateSuccessRes(res, 200, users);
  } catch (error) {
    log_admin.error(`Lỗi khi lấy tất cả user với lỗi ${error}`);
    next(error)
  }
});
router.get('/:id', check_authentication, check_authorization(constants.MOD_PERMISSION), async function (req, res, next) {
  try {
    if (req.params.id === req.user.id) {
      throw new Error("Bạn không thể lấy thông tin của chính mình")
    }

    let user = await userController.GetUserById(req.params.id);
    CreateSuccessRes(res, 200, user);
  } catch (error) {
    log_admin.error(`Lỗi khi lấy user theo id: ${req.params.id} với lỗi ${error}`);
    CreateErrorRes(res, 404, error);
  }
});

router.post('/',check_authentication,check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
  try {
    let body = req.body
    let newUser = await userController.CreateAnUser(body.username, body.password, body.email, body.address, body.role);
    CreateSuccessRes(res, 200, newUser);
  } catch (error) {
    log_admin.error(`Lỗi khi thêm user với lỗi ${error}`);
    next(error);
  }
});
router.put('/reset_password/:id',check_authentication,check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
  try {
    let updateUser = await userController.ResetPasswordUser(req.params.id);
    CreateSuccessRes(res, 200, updateUser);
  } catch (error) {
  
    next(error);
  }
});
router.put('/:id',check_authentication,check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
  try {
    let updateUser = await userController.UpdateUser(req.params.id, req.body);
    CreateSuccessRes(res, 200, updateUser);
  } catch (error) {
    log_admin.error(`Lỗi khi cập nhật user ${req.params.id} với lỗi ${error}`);
    next(error);
  }
});
router.delete('/:id',check_authentication,check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
  try {
    let deleteUser = await userController.DeleteUser(req.params.id);
    CreateSuccessRes(res, 200, deleteUser);
  } catch (error) {
    log_admin.error(`Lỗi khi xóa user ${req.params.id} với lỗi ${error}`);
    next(error);
  }
});


module.exports = router;
