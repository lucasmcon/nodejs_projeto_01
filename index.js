const express = require("express");
const app = express();
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

//Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

// Estou dizendo para o Express usar o EJS como View engine
app.set('view engine','ejs');
app.use(express.static('public'));
// Body parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Rotas
app.get("/",(req, res) => {
    Pergunta.findAll({ raw: true, order:[
        ['id','DESC'] // ASC = Crescente || DESC = Decrescente
    ]}).then(perguntas => {
        res.render("index",{
            perguntas: perguntas
        });
    });
});

app.get("/perguntar",(req, res) => {
    res.render("perguntar");
})

app.post("/salvarpergunta",(req, res) => {

    var per_st_tit = req.body.per_st_tit;
    var per_st_desc = req.body.per_st_desc;

    Pergunta.create({
        per_st_tit: per_st_tit,
        per_st_desc: per_st_desc
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/pergunta/:id",(req ,res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ // Pergunta encontrada

            Resposta.findAll({
                where: {per_in_id: pergunta.id},
                order:[ 
                    ['per_in_id','DESC'] 
                ]
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });

        }else{ // Não encontrada
            res.redirect("/");
        }
    });
})

app.post("/responder",(req, res) => {
    var res_st_desc = req.body.res_st_desc;
    var per_in_id = req.body.per_in_id;
    Resposta.create({
        res_st_desc: res_st_desc,
        per_in_id: per_in_id
    }).then(() => {
        res.redirect("/pergunta/"+per_in_id);
    });
});

app.listen(8090,()=>{console.log("App rodando!");})