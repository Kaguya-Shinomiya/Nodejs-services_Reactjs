var express = require('express');
var router = express.Router();
//let productController = require('../controllers/logs')
var { CreateSuccessRes, CreateErrorRes } = require('../utils/ResHandler')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  //let categories = await productController.GetAllProduct();
  //CreateSuccessRes(res, 200, categories);
});
router.get('/:id', async function (req, res, next) {
  try {
    //let product = await productController.GetProductById(req.params.id)
    //CreateSuccessRes(res, 200, product);
  } catch (error) {
    CreateErrorRes(res, 404, error);
  }
});
router.get('/category_name/:category', async function (req, res, next) {
  try {
    //let product = await productController.GetCategoryOfProduct(req.params.category)
    //CreateSuccessRes(res, 200, product);
  } catch (error) {
    CreateErrorRes(res, 404, error);
  }
});

router.post('/', async function (req, res, next) {
  try {
    let body = req.body;

    // Kiểm tra bắt buộc các trường
    // if (!body.productName || !body.price || !body.categoryId || !body.producerId || body.isPreOrder === undefined || body.stockQuantity === undefined) {
    //   return res.status(400).json({ message: "productName, price, categoryId, isPreOrder, and stockQuantity are required" });
    // }
    //console.log("Đã tới được đây hehehe");
    // await productController.CreateNewProduct(req, res);
    //console.log("Đã qua được đây hehehe");
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async function (req, res, next) {

})



module.exports = router;