const Sequelize = require('sequelize');
// dados conexão vindos de arquivo json fora do repositorio para não subir github -> substituir por .env e gitignore depois
const {dataBase, userDb, passDb} = require("../../dados.json")

const connection = new Sequelize(dataBase, userDb, passDb,{
    host: 'localhost',
    dialect: 'mysql',
    logging: false //não aparecer "executing default select 1+1 as result" no terminal
})

module.exports = connection;

