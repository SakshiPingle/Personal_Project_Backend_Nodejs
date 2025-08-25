const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
exports.loginUser = async (req,res,next)=>{
  try{
   const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({
      message:'Logged in successfully',
      body:user,
      is_user:true
    })
  }catch(err){
    console.log("Error While login", err)
    res.status(500).json({
      message:'User Not Registered',
      body:[],
      is_user:false
    })
  }
}

exports.RegisterUser = async (req, res, next) => {
  try{
  const hash = await bcrypt.hash(req.body.password, 5);
  console.log("rohan",hash)
  const user = await User.create({
    name: req.body.user_name,
    email: req.body.email,
    password: hash,
  });
   res.status(200).send({
        success: true,
        message: "User registered successfully",
        data: user,
      });
  }catch(err){
    console.log("Error while Registration")
     res.status(500).send({
        success: true,
        message: "User registered Failed",
        data: [],
      });
  }
};

