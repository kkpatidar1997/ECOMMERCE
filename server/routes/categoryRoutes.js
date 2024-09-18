    import express from 'express';
    import { requireSignIn, isAdmin} from './../middlewares/authMiddleware.js' 
import {  categoryControlller, createCategoryController,  deleteCategoryController,  singleCategoryController,  updateCategoryController } from '../controllers/categoryController.js';


 const router = express.Router()
  //routes
    router.post("/create-category" ,requireSignIn, isAdmin , createCategoryController);
  //udatecategory routes
    router.put("/update-category/:id" ,requireSignIn, isAdmin , updateCategoryController);
    // gell app category route
    router.get ("/get-category", categoryControlller );
   // get singal categorry
   router.get("/single-category/:slug", singleCategoryController)
   //delete category
   router.delete("/delete-category/:id" , requireSignIn,isAdmin, deleteCategoryController)
  export default router;