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

exports.updateProduct = async (req, res, next) => {
    try{
       let result = await  Product.update(
        {
         product_name : req.body.product_name,
         product_description : req.body.product_description,
         product_price : req.body.product_price,
         categoryId : req.body.category,
       },
       {
        where : {
            id : req.body.id
        }
       }
    )
    res.status(200).json({
        message: "Product Updated Succesfully",
        data: result,
      });
    }catch(err){
        console.log("Errro in Updating product",err)
         res.status(500).json({
        message: "Failed Updating Product",
        data: [],
      });
    }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    let product_id = req.params.product_id;
    let details = await Product.destroy({ where: { id: product_id } });
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
    let products = await Product.findAll({
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
    res.status(500).json({
      message: "Failed Fetching Product List",
      data: [],
    });
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    let product_id = req.params.product_id;
    let products = await Product.findAll({
      where:{
        id : product_id
      }
    });
    res.status(200).json({
      message: "Product Details Fetched Successfully",
      data: products,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).json({
      message: "Failed Fetching Product DEtails",
      data: [],
    });
  }
}