const express = require('express');
const app = express();
const sequelize = require('./util/postgres_connection');
// to parse request body (npm i body-parser)
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
// importing models
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Category = require('./models/categoryModel');
// defining relationships
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
Product.belongsTo(Category, {constraints: true, onDelete: 'CASCADE'});
Category.hasMany(Product);
// importing the routing files
const userRoutes = require('./routes/userRoutes');
app.use(userRoutes)
const productRoutes = require('./routes/productRoutes');
app.use(productRoutes)
const categoryRoutes = require('./routes/categoryRoutes')
app.use(categoryRoutes)


sequelize
  .sync()
  .then(() => {
    app.listen(3034, () => {
      console.log("Server in running in 3034");
    });
  })
  .catch((err) => {
    console.log("error",err);
  });
