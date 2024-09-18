import express from 'express'
import { isAdmin,requireSignIn} from '../middlewares/authMiddleware.js';
import { brainTreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController, realtedProductController, searchProductController, updateProductController } from '../controllers/productController.js';
import  formidable from 'express-formidable';
 
const router = express.Router();

//routes
//router.post("/create-product", requireSignIn, isAdmin, formidable(),  createProductController);
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

export default router;
//get products
router.get("/get-product", getProductController);
//get singal products
router.get("/get-product/:slug", getSingleProductController)
//get photo
router.get("/product-photo/:pid",productPhotoController)
//delete rproduct
router.delete("delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);
//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);
//serach input
router.get("/search/:keyword", searchProductController);
//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);
 //toke n ,
 router.get("/braintree/token" ,braintreeTokenController)
 // payment route
  router.post("/braintree/payment" , requireSignIn,   brainTreePaymentController)

