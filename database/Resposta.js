const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define("cad_tb_resposta", {
    res_st_desc: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    per_in_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force: false});

module.exports = Resposta;