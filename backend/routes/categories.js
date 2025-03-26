var express = require('express');
var router = express.Router();
let categoryController = require('../controllers/categories')
var {CreateSuccessRes,CreateErrorRes} = require('../utils/ResHandler')

router.get('/', async function(req, res, next) {
    let categories = await categoryController.GetAllCategory();
    CreateSuccessRes(res,200,categories);
});
router.get('/:id', async function(req, res, next) {
  try {
    let category = await categoryController.GetCategoryById(req.params.id)
    CreateSuccessRes(res,200,category);
  } catch (error) {
    CreateErrorRes(res,404,error);
  }
});
router.post('/', async function(req, res, next) {
    try {
      let body = req.body;
      if (!body.name) {
        return res.status(400).json({ message: "Name are required" });
      }

      let newCate = await categoryController.CreateNewCategory(body.name, body.description);
      CreateSuccessRes(res,200,newCate);
    } catch (error) {
      next(error);
    }
})
router.put('/:id', async function(req, res, next) {
  
})



module.exports = router;
