// const { urlencoded } = require("body-parser");
// const bodyParser = require("body-parser");
require('dotenv').config();

const express = require("express");
const app = express();
const connection = require('./database/database');
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o Banco de Dados!");
    })
    .catch((msgErro) =>{
        console.log("Não foi possível conectar ao Banco de Dados: " + msgErro);
    })


//set view engine como ejs
app.set('view engine','ejs');

//set pasta arquivos estáticos
app.use(express.static('public'));

//config. bodyParser - modo antigo deprecated / não precisa instalar
app.use(express.urlencoded({extended: true}));
app.use(express.json());



//rotas
app.get("/", (req,res) => {
    Pergunta.findAll({raw: true, order:[
            ['id','DESC']
        ]}).then( perguntas => {
        res.render("index",{
        perguntas: perguntas
        });
    });
});


app.get("/perguntar", (req,res) => {
    res.render("perguntar");
})

app.post("/salvarpergunta", (req,res) =>{
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/pergunta/:id", (req, res) => {
   var id = req.params.id;
   Pergunta.findOne({
    where: {id: id}
   }).then(pergunta => {
        if(pergunta != undefined){

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [ [ 'id','DESC' ] ]
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        }else{
            res.redirect("/");
        }
   }); 
})

app.post("/responder",(req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);
    });
});

app.listen(3000, ()=>{
    console.log("App rodando");
});