const connection = require("./database");
const sequelize = require("sequelize");


const Pergunta = connection.define("pergunta",{
    titulo: {
        type: sequelize.STRING,
        allowNull: false,
    },
    descricao: {
        type: sequelize.TEXT,
        allowNull: false,
    },
});

Pergunta.sync({force: false}).then(() => {});

module.exports = Pergunta;