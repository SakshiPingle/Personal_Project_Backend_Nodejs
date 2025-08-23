const Sequelize = require('sequelize');
const sequelize = require('../util/postgres_connection');4
const category =  sequelize.define('category',{
    id:{
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey :true,
    },
    category_name:{
        type : Sequelize.STRING,
        allowNull : false
    },
    category_id:{
        type : Sequelize.STRING,
        allowNull : false
    },
    

})

module.exports=category;