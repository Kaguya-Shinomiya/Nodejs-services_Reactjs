var express = require('express');
var log_admin = require('../utils/logger');
var router = express.Router();
let productController = require('../controllers/products')
var { CreateSuccessRes, CreateErrorRes } = require('../utils/ResHandler')
let {check_authentication,check_authorization} = require('../utils/check_auth')
let constants = require('../utils/constants')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  let categories = await productController.GetAllProduct();
  CreateSuccessRes(res, 200, categories);
});
router.get('/:id', async function (req, res, next) {
  try {
    let product = await productController.GetProductById(req.params.id)
    CreateSuccessRes(res, 200, product);
  } catch (error) {
    log_admin.error(`Lỗi khi lấy sản phẩm theo id: ${req.params.id}`);
    CreateErrorRes(res, 404, error);
  }
});
router.get('/category_name/:category', async function (req, res, next) {
  try {
    let product = await productController.GetCategoryOfProduct(req.params.category)
    CreateSuccessRes(res, 200, product);
  } catch (error) {
    log_admin.error(`Lỗi khi lấy sản phẩm theo danh mục`);
    CreateErrorRes(res, 404, error);
  }
});
router.get('/best-sellers/products', async function (req, res, next) {
  try {
    let product = await productController.GetBestSellerProduct()
    CreateSuccessRes(res, 200, product);
  } catch (error) {
    log_admin.error(`Lỗi khi lấy sản phẩm bán chạy nhất`);
    CreateErrorRes(res, 404, error);
  }
});
router.post('/', check_authentication,check_authorization(constants.ADMIN_PERMISSION),async function (req, res, next) {
  try {
    let body = req.body;

    if (!body.productName || !body.price || !body.categoryId || !body.producerId || body.isPreOrder === undefined || body.stockQuantity === undefined) {
      return res.status(400).json({ message: "productName, price, categoryId, isPreOrder, and stockQuantity are required" });
    }
    await productController.CreateNewProduct(req, res);
  } catch (error) {
    log_admin.error(`Lỗi khi thêm sản phẩm: ${req.body}`);
    next(error);
  }
});

router.put('/:id',check_authentication,check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
  try {
    const body = req.body;

    if (!body.productName || !body.price || !body.categoryId || !body.producerId || body.isPreOrder === undefined || body.stockQuantity === undefined) {
      return res.status(400).json({
        message: "productName, price, categoryId, producerId, isPreOrder, and stockQuantity are required"
      });
    }

    const updatedProduct = await productController.UpdateProduct(req.params.id, req);
    return res.status(200).json(updatedProduct);
  } catch (error) {
    log_admin.error(`Lỗi khi sửa sản phẩm id: (${req.params.id}), ${req.body}`);
    return res.status(500).json({ error: error.message });
  }
});

router.delete('/:id',check_authentication,check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
  try {
    let deleteProduct = await productController.DeleteProduct(req.params.id);
    CreateSuccessRes(res, 200, deleteProduct);
  } catch (error) {
    log_admin.error(`Lỗi khi xóa sản phẩm ${req.params.id}`);
    next(error);
  }
})


module.exports = router;
