const Sequelize = require('sequelize');
const sequelize = require('../util/postgres_connection');4
const product = sequelize.define('product',{
  id: {
    type : Sequelize.INTEGER,
    autoIncrement : true,
    primaryKey :true,
  },
  product_name: {
    type : Sequelize.STRING,
    allowNull : false
  },
  product_description: {
    type : Sequelize.STRING,   // optional, since you use it in controller
    allowNull : true
  },
  product_price: {
    type : Sequelize.INTEGER,
    allowNull : false
  },
})
module.exports=product;