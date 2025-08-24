const User = require('../models/userModel');
exports.loginUser = ((req,res,next)=>{
 
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
      res.status(404).send({
        success: true,
        message: "User registered Failed",
        data: user,
      });
    });
};


exports.UpdateUser = ((res,req,next)=>{

})
