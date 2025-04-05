var express = require('express');
var router = express.Router();
let roleController = require('../controllers/roles')
var {CreateSuccessRes,CreateErrorRes} = require('../utils/ResHandler')
let {check_authentication,check_authorization} = require('../utils/check_auth')
let constants = require('../utils/constants')

/* GET users listing. */
router.get('/', async function(req, res, next) {
    let users = await roleController.GetAllRole();
    CreateSuccessRes(res,200,users);
});
router.get('/:id', async function(req, res, next) {
  try {
    let user = await roleController.GetRoleById(req.params.id)
    CreateSuccessRes(res,200,user);
  } catch (error) {
    next(error);
  }
});
router.post('/', check_authentication,check_authorization(constants.ADMIN_PERMISSION),async function(req, res, next) {
  try {
    let newRole = await roleController.CreateRole(req.body.name);
    CreateSuccessRes(res,200,newRole);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', check_authentication,check_authorization(constants.ADMIN_PERMISSION), async function(req, res, next) {
  try {
    let newRole = await roleController.UpdateRole(req.body.id,req.body.name);
    CreateSuccessRes(res,200,newRole);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',check_authentication,check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
  try {
    let body = req.body
    let deleteRole = await roleController.DeleteRole(req.params.id, req.body);
    CreateSuccessRes(res, 200, deleteUser);
  } catch (error) {
    next(error);
  }
})





module.exports = router;
