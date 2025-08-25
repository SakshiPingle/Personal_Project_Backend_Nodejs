const Category = require("../models/categoryModel");

exports.createCategory = async (req, res, next) => {
  try {
    let category = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json({
      message: "Category Added Succesfully",
      data: category,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed Adding Category",
      data: [],
    });
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    let id = req.body.id;
    let category_name = req.body.category_name;
    let result = await Category.update({ category_name: category_name }, { where: { id: id } });
    res.status(200).json({
      message: "Category Updated Succesfully",
      data: result,
    });
  } catch (err) {
    console.log("Err Updating Category", err);
    res.status(500).json({
      message: "Failed Updating Category",
      data: [],
    });
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    let category_id = req.params.category_id;
    let details = await Category.destroy({ where: { id: category_id } });
    res.status(200).json({
      message: "Category Deleted Successfully",
      data: details,
    });
  } catch (err) {
    console.log("Error deletig category", err);
    res.status(500).json({
      message: "Failed Deleting Category",
      data: [],
    });
  }
};

exports.getCategoryList = async (req, res, next) => {
  try {
    let details = await Category.findAll();
     res.status(200).json({
      message: "Succesfully Fetching Category List",
      data: details,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).json({
      message: "Failed Fetching Category List",
      data: [],
    });
  }
};

exports.getCategoryById =async (req, res, next) => {
  try{
     let category_id = req.params.category_id;
     console.log("category_id",category_id)
     let result = await Category.findAll({
      where : { 
        id: category_id 
      } 
      })
     console.log("result",result)
     res.status(200).json({
        message: "Category Fetched Succesfully",
        data: result,
      });
  }catch(err){
    console.log("Error getting category by id",err)
      res.status(500).json({
        message: "Failed Fetching Category",
        data: [],
      });
  }
};
