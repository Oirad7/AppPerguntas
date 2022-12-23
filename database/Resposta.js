const connection = require("./database");
const sequelize = require("sequelize");


const Resposta = connection.define("respostas",{
    corpo: {
        type: sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: sequelize.INTEGER,
        allowNull: false
    },
});

Resposta.sync({force: false}).then(() => {});

module.exports = Resposta;