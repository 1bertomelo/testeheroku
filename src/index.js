//importando o pacote express
const { request } = require('express');
const express = require('express');
const { uuid, isUuid } = require('uuidv4');
const cors = require('cors');
const mongoose = require('mongoose');
const AlunoRepositorio = require('./models/Aluno');


//preparar para usar o express;
const app = express();
app.use(express.json());
app.use(cors());
const repositories = [];

require('dotenv').config({
    path: process.env.NODE_ENV === "test" ?
        "./src/config/.env.testing"
        : "./src/config/.env"
});

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


//1 paramatro o nome da rota 
//2 parametro ação que vou fazer funcao
//java script arrow function
// (parametros) => {  codigos programa fazer }


app.get('/', async (request, response) => {
    const retornoAluno = await AlunoRepositorio.find();
    return response.json(retornoAluno);
});


app.post('/', async (request, response) => {
    const { nome, email, cpf } = request.body;
    //destruturação 
    const retornoAluno = await AlunoRepositorio.create({
        id: uuid(), nome, cpf, email
    });
    return response.json({ retornoAluno });
});

app.put('/:id', (request, response) => {
    //route params guid
    const { id } = request.params;
    const { name, email } = request.body;
    //id enviado existe no array?
    const studentResearch = repositories.findIndex(studentIndex => studentIndex.id == id);
    if (studentResearch < 0) {
        return response.status(404).json({ "error": "Student not found" });
    }
    const newStudent = { id, name, email };
    repositories[studentResearch] = newStudent;
    return response.json(newStudent);

});

app.delete('/:id', (request, response) => {
    const { id } = request.params;
    //id enviado existe no array?
    const studentResearch = repositories.findIndex(studentIndex => studentIndex.id == id);
    if (studentResearch < 0) {
        return response.status(404).json({ "error": `Student ${id} not found` });
        //template string
    }
    repositories.splice(studentResearch, 1);
    return response.json({ "Message": `Student ${id} removed` });
});

//teste heroku publicação

//PORT variavel usada heroku
module.exports = app.listen(process.env.PORT || 3333, () => {
    console.log("Server running");
});

