const express = require("express");
const app = express();

//set view engine como ejs
app.set('view engine','ejs');

//set pasta arquivos estáticos
app.use(express.static('public'));

app.get("/", (req,res) => {
    //res.send("Bem-vindo!");
    res.render("index");
});

app.get("/perfil/:nome", (req, res) => {
    //let nome =  "Victor";
    let nome = req.params.nome;
    let lang = "Javascript";
    let msg = false;

    let produtos = [
        {nome: "Doritos", preco:10.0},
        {nome: "Maçã", preco:3.50},
        {nome: "Suco de Uva", preco:7.0},
        {nome: "Sanduíche", preco:15.0},                
    ]

    res.render("perfil/perfil",{
        nome: nome,
        lang: lang,
        empresa: "Teste",
        inscritos: 8000,
        msg: msg,
        produtos: produtos
    });
});

app.listen(3000, ()=>{
    console.log("App rodando");
});