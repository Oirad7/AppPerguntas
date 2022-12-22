const { Sequelize } = require('sequelize');

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false //não aparecer "executing default select 1+1 as result" no terminal
});

module.exports = connection;

