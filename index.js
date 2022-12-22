// const { urlencoded } = require("body-parser");
// const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const connection = require('./database/database');

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o Banco de Dados!");
    })
    .catch((msgErro) =>{
        console.log(msgErro);
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
    res.render("index");
});

app.get("/perguntar", (req,res) => {
    res.render("perguntar");
})

app.post("/salvarpergunta", (req,res) =>{
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    res.send("formulário recebido! Título: " + titulo + " descricao: " + descricao);
})

app.listen(3000, ()=>{
    console.log("App rodando");
});