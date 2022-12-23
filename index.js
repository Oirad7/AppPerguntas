// const { urlencoded } = require("body-parser");
// const bodyParser = require("body-parser");
require('dotenv').config();

const express = require("express");
const app = express();
const connection = require('./database/database');
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");


/*
try {
  await connection.authenticate();
        console.log("Conexão feita com o Banco de Dados!");
} catch (error) {
    console.error('Não foi possível conectar ao Banco de Dados!'; error);
}
*/

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
            res.render("pergunta",{
                pergunta: pergunta
            });
        }else{
            res.redirect("/");
        }
   }); 
})

app.listen(3000, ()=>{
    console.log("App rodando");
});