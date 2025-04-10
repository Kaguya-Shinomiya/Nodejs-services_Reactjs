var express = require('express');
var router = express.Router();
let logController = require('../controllers/logs');
const log_admin = require('../utils/logger');
var { CreateSuccessRes, CreateErrorRes } = require('../utils/ResHandler');


router.get('/', async function (req, res, next) {
  let logs = await logController.GetAllLogs();
  CreateSuccessRes(res, 200, categories);
});
router.get('/:id', async function (req, res, next) {
  try {
    let log = await logController.GetLogByID(req.params.id);
    CreateSuccessRes(res, 200, log);
  } catch (error) {
    CreateErrorRes(res, 404, error);
    log_admin.error(`Lỗi khi lấy log qua ${req.params.id}: ${error}`);
  }
});

router.post('/', async function (req, res, next) {
  try {
    let body = req.body;

  } catch (error) {
    next(error);
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    let log = await logController.UpdateLog(req.params.id, req.params.body);
    CreateSuccessRes(res, 200, log);
  } catch (error) {
    CreateErrorRes(res, 404, error);
    log_admin.error(`Lỗi khi update log qua ${req.params.id}: ${error}`);
  } 
})



module.exports = router;