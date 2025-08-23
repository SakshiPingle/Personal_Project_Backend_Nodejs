const Sequelize = require('sequelize');
const sequelize = new Sequelize('test_project','postgres','admin',
    {
        dialect: 'postgres',
        host : 'localhost'
    }
)

module.exports = sequelize;