import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  productSearchCotroller,
  relatedProductController,
  updateProductController,
  braintreeTokenController,
  braintreePaymentController,
} from "../controller/productController.js";
import formidable from "express-formidable";

const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);
router.get("/get-product", getProductController);

router.get("/get-product/:slug", getSingleProductController);
router.get("/product-photo/:pid", productPhotoController);
router.delete("/delete-product/:pid", deleteProductController);

//filter products
router.post(`/product-filter`, productFilterController);

//Pagination of product

router.get("/product-count", productCountController);
router.get("/product-list/:page", productListController);

//Searching Product
router.get("/search/:keywords", productSearchCotroller);

//Related Products
router.get("/reated-product/:pid/:cid", relatedProductController);

router.get(`/product-category/:slug`, productCategoryController);

//Payment Gateway
//token
router.get("/braintree/token", braintreeTokenController);
// //payment
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;
