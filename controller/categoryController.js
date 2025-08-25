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

exports.updateCategory = (req, res, next) => {
  console.log(req.body);
  let id = req.body.id;
  let category_name = req.body.category_name;
  Category.update(
    { category_name: category_name },
    { where: { id: id } }
  )
    .then((data) => {
      res.status(200).json({
        message: "Category Updated Succesfully",
        data: data,
      });
    })
    .catch(() => {
      res.status(200).json({
        message: "Failed Updating Category",
        data: [],
      });
    });
};

exports.deleteCategory = (req, res, next) => {
  try {
    let category_id = req.params.category_id;
    let details = Category.destroy({ where: { id: category_id } });
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
    res.status(200).json({
      message: "Failed Fetching Category List",
      data: [],
    });
  }
};

exports.getCategoryById = (req, res, next) => {
  let category_id = req.params.category_id;
  Category.findOne({ category_id: category_id })
    .then((data) => {
      res.status(200).json({
        message: "Category Fetched Succesfully",
        data: data,
      });
    })
    .catch(() => {
      res.status(200).json({
        message: "Failed Fetching Category",
        data: [],
      });
    });
};
