const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define('cad_tb_pergunta',{
    per_st_tit:{
        type: Sequelize.STRING,
        allowNull: false
    },
    per_st_desc:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(() => {});

module.exports = Pergunta;