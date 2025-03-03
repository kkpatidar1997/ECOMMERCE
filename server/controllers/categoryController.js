import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";



export  const createCategoryController = async (req,res) => {
    try {
        const { name } = req.body
        if(!name){
            res.status(401),send({message:'Name is required'});
        }
         const exitingCategory = await categoryModel.findOne({name});
         if(exitingCategory){
            return res.status(200).send({
                success: true,
                message : 'category already exit',
            });
         }
          const category = await new categoryModel({
            name,
            slug: slugify(name),
          }).save();
          res.status(200).send({
            success:true,
            message:'category created',
            category,
          });
    } catch (error) {
        console.log(error);
        res.status(500).send( {
            success: false,
            error,
            message: 'error in category'
        })
        
    }

};
//update categorey
export const updateCategoryController = async (req,res)=>{
    try {
        const {name}= req.body ;
        const { id }= req.params ;
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new :true});
        res.status(200).send({
            success:true,
            message: "category updated succesfully",
            category,
        });
        
    } catch (error) {
         console.log(error);
        res.status(500).send( {
            success: false,
            error,
            message: 'error  while in updateing category'
        
        });

}};
    
//get all category
export const categoryControlller = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Categories List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};


 //get single category
 export const singleCategoryController=async(req,res)=>{
    try {

        const category= await  categoryModel.findOne({slug:req.params.slug})
            res.status(200).send({
                success:true,
                message : ' got signal category successfully',
                category,
            });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"errror while getting signle category"
        });
        
    }
 };
  //delete category
   export const deleteCategoryController = async(req,res)=>{
    try {
        const { id  } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message: 'deleted category succcessfully',
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"error while deleting category"
        })
        
    }

   }
   ;