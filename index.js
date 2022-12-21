const express = require("express");
const app = express();

//set view engine como ejs
app.set('view engine','ejs');

//set pasta arquivos estáticos
app.use(express.static('public'));

app.get("/", (req,res) => {
    res.render("index");
});

app.get("/perguntar", (req,res) => {
    res.render("perguntar");
})

app.post("/salvarpergunta", (req,res) =>{
    res.send("formulário recebido!");
})

app.listen(3000, ()=>{
    console.log("App rodando");
});