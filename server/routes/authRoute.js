import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController, 
  
  updateProfileController,
  getOrderController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//forgot password

router.post("/forgot-password",forgotPasswordController )
//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected user route
router.get("/user-auth",requireSignIn,(req,res)=>{
  res.status(200).send({ok:true})
})
 // protecetd admin route
router.get("/admin-auth",requireSignIn, isAdmin, (req,res)=>{
  res.status(200).send({ok:true}) 
})
//update profile
router.put("/profile", requireSignIn, updateProfileController);
 
// order
router.get("/order", requireSignIn, getOrderController)
//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;

