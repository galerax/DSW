const express = require("express");

var db = require("./baseData");
var testCPF = require("./util/testaCPF")

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.engine('html', require('ejs').renderFile);



server.get("/", function (req, res) {
    res.send(`Atividade Node JS\n`);
})

server.get("/api/", function (req, res) {
    res.send("This is the Api route");
})

server.get("/api/cpf/return", function (req, res) {
    res.send(db);
})

server.get("/api/cpf/return/:cpf/", function (req, res) {
    res.send(db.filter(function(obj){return obj.cpf == req.params.cpf}));
})


server.post("/api/cpf/check/", function (req, res) {
    const newEntry = {cpf: req.body.cpf, description: testCPF(req.body.cpf)}
    db.push(newEntry);
    res.send(newEntry);
})

server.delete("/api/cpf/del/:cpf/", function (req, res) {
    db = db.filter(function(obj){return obj.cpf != req.params.cpf});
    res.sendStatus(200)
})

server.put("/api/cpf/update/:cpf/", function (req, res) {

    for (let index = 0; index < db.length; index++) {
        if (db[index].cpf == req.params.cpf) {
            db[index].description = req.body.description
        }  
    }
    res.sendStatus(200)
})

server.listen(8081, function () {
    console.log("Server is running in: http://localhost:8081/")
});

