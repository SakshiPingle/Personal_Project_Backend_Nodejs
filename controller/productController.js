const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const XLSX = require("xlsx");
const { Op } = require('sequelize');
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
    let limit = +req.params.page_size;
    let current_page = +req.params.current_page;
    // console.log("page",page_size)
    console.log("curre",current_page)
    let offset = (current_page - 1) * limit;

    let sort_type = req.params.sort_type?.toUpperCase() || 'ASC';
    let search = req.query.search?.trim() || ''; 
    console.log("search",search)
     const { count, rows } = await Product.findAndCountAll({
      limit: limit,
      offset: offset,
      include:
       [
        { 
          model: Category, 
          attributes: ['id', 'category_name'],
        } 
      ],
       where: search
        ? {
            [Op.or]: [
              { product_name: { [Op.iLike]: `%${search}%` } },
              { '$category.category_name$': { [Op.iLike]: `%${search}%` } } // 👈 search in joined table
            ]
          }
        : {},
      order: [['product_price', sort_type]]
    });
    
    res.status(200).json({
      message: "Product list fetched successfully",
      data: rows,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      pagination: {  
        currentPage: current_page,
        pageSize: limit
      }
    });

    // res.status(200).json({
    //   message: "Product List Fetched Successfully",
    //   data: products,
    // });
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

exports.uploadExcel = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
     console.log("req.file",req.file?true:false)
    // Read Excel file
    const workbook = XLSX.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet); // [{product_name, product_price, categoryId}, ...]

    // Insert in batches to handle large files
    const batchSize = 1000;
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize).map(row => ({
        product_name: row.product_name,
        product_description: row.product_description,
        product_price: row.product_price,
        categoryId: row.categoryId
      }));
      await Product.bulkCreate(batch, { ignoreDuplicates: true });
    }

    res.json({ message: "Upload successful", totalRecords: data.length });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed" });
  }
};