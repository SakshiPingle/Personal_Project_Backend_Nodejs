const Sequelize = require('sequelize');
const sequelize = require('../util/postgres_connection');
const user = sequelize.define('user',{
    id:{
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    name:{
        type : Sequelize.STRING,
        allowNull : false,
    },
    email:{
        type : Sequelize.STRING,
    },
    password:{
        type : Sequelize.STRING,
    }
})

module.exports = user;