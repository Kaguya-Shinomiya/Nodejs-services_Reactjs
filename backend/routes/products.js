var express = require('express');
var router = express.Router();
let productController = require('../controllers/products')
var { CreateSuccessRes, CreateErrorRes } = require('../utils/ResHandler')

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
    CreateErrorRes(res, 404, error);
  }
});
router.get('/category_name/:category', async function (req, res, next) {
  try {
    let product = await productController.GetCategoryOfProduct(req.params.category)
    CreateSuccessRes(res, 200, product);
  } catch (error) {
    CreateErrorRes(res, 404, error);
  }
});
router.get('/best-sellers/products', async function (req, res, next) {
  try {
    let product = await productController.GetBestSellerProduct()
    CreateSuccessRes(res, 200, product);
  } catch (error) {
    CreateErrorRes(res, 404, error);
  }
});
router.post('/', async function (req, res, next) {
  try {
    // console.log("Request body:", req.body);
    // console.log("Request files:", req.files);
    let body = req.body;

    // Kiểm tra bắt buộc các trường
    if (!body.productName || !body.price || !body.categoryId || !body.producerId || body.isPreOrder === undefined || body.stockQuantity === undefined) {
      return res.status(400).json({ message: "productName, price, categoryId, isPreOrder, and stockQuantity are required" });
    }
    await productController.CreateNewProduct(req, res);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async function (req, res, next) {
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
      console.error(error);
      return res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    let body = req.body;
    console.log(req.params.id)
    let deleteProduct = await productController.DeleteProduct(req.params.id, body);
    CreateSuccessRes(res, 200, deleteProduct);
  } catch (error) {
    next(error);
  }
})


module.exports = router;
