const Category = require('../models/categoryModel')

exports.createCategory = ((req,res,next)=>{

 let category = new Category({
    category_name : req.body.category_name,
    category_id : req.body.uniqueID
 })
 category.save()
 .then((data)=>{
    res.status(200).json({
        message:"Category Added Succesfully",
        data:data
    })
 }).catch(()=>{
    res.status(200).json({
        message:"Failed Adding Category",
        data:[]
    })
 })
})

exports.updateCategory = ((req,res,next)=>{
    console.log(req.body)
    let category_id = req.body.category_id;
    let category_name =  req.body.category_name
   Category.update(
    {category_name :category_name},
    {where:{category_id :category_id}}
   )
    .then((data)=>{
    res.status(200).json({
        message:"Category Updated Succesfully",
        data:data
    })
 }).catch(()=>{
    res.status(200).json({
        message:"Failed Updating Category",
        data:[]
    })
 })
})


exports.deleteCategory = (req, res, next) => {
  let category_id = req.params.category_id;
  Category.destroy({ where: { category_id: category_id } })
    .then((data) => {
      res.status(200).json({
        message: "Category Deleted Successfully",
        data: data
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Failed Deleting Category",
        data: []
      });
    });
};

 
exports.getCategoryList = ((req,res,next)=>{
  Category.findAll()
  .then((data)=>{
    res.status(200).json({
        message:"Category List Fetched Succesfully",
        data:data
    })
  }).catch(()=>{
      res.status(200).json({
        message:"Failed Fetching Category List",
        data:[]
    })
  })
})

exports.getCategoryById = ((req,res,next)=>{
    let category_id = req.params.category_id;
    Category.findOne({category_id : category_id})
     .then((data)=>{
    res.status(200).json({
        message:"Category Fetched Succesfully",
        data:data
    })
 }).catch(()=>{
    res.status(200).json({
        message:"Failed Fetching Category",
        data:[]
    })
 })
})