const User = require('../models/userModel');
exports.loginUser = ((req,res,next)=>{
  console.log(req.body)
  let user_email = req.body.email;
  let password = req.body.password
  User.findOne({email:user_email , password:password})
  .then((user)=>{
    res.status(200).json({
      message:'Logged in successfully',
      body:user,
      is_user:true
    })
  })
  .catch(()=>{
    res.status(500).json({
      message:'User Not Registered',
      body:[],
      is_user:false
    })
  })
})

exports.RegisterUser = (req, res, next) => {
  // create a instance of the model
  const user = new User({
    name: req.body.user_name,
    email: req.body.email,
    password: req.body.password,
  });
  // save that instance of the model
  user
    .save()
    .then(() => {
      res.status(200).send({
        success: true,
        message: "User registered successfully",
        data: user,
      });
    })
    .catch(() => {
      res.status(500).send({
        success: true,
        message: "User registered Failed",
        data: user,
      });
    });
};


exports.UpdateUser = ((res,req,next)=>{

})
