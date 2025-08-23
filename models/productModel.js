const Sequelize = require('sequelize');
const sequelize = require('../util/postgres_connection');4
const product = sequelize.define('product',{
    id:{
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey :true,
    },
    product_name:{
        type : Sequelize.STRING,
        allowNull : false
    },
    product_price:{
        type : Sequelize.INTEGER,
        allowNull : false
    },
    product_category:{
        type : Sequelize.STRING,
        allowNull : false
    },
    product_category_id:{
        type :Sequelize.STRING,
        allowNull : false,
    }
})
module.exports=product