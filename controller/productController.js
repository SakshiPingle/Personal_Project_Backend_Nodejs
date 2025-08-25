const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
exports.createProduct = async (req, res, next) => {
  try {
    console.log("product ", req.body);
    let product = await Product.create({
      product_name: req.body.product_name,
      product_description: req.body.product_description,
      product_price: req.body.product_price,
      categoryId: req.body.category, // <-- foreign key
    });

    res.status(200).json({
      message: "Product Added Succesfully",
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed Adding Product",
      data: [],
    });
  }
};

exports.updateProduct = (req, res, next) => {};

exports.deleteProduct = (req, res, next) => {
  try {
    console.log("req.params.",req.params.product_id)
    let product_id = req.params.product_id;
    let details = Product.destroy({ where: { id: product_id } });
     res.status(200).json({
      message: "Product Deleted Successfully",
      data: details,
    });
  } catch (err) {
    console.log("Errr deleting product", err);
    res.status(500).json({
      message: "Failed Deleting Product",
      data: [],
    });
  }
};

exports.getProductList = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ["id", "category_name"], // only these columns
        },
      ],
    });
    res.status(200).json({
      message: "Product List Fetched Successfully",
      data: products,
    });
  } catch (err) {
    console.log("err", err);
    res.status(200).json({
      message: "Failed Fetching Product List",
      data: [],
    });
  }
};
