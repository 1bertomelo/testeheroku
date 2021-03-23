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

require('dotenv').config({
    path: process.env.NODE_ENV === "test" ?
        "./src/config/.env.testing"
        : "./src/config/.env"
});

console.log(process.env.DB_CONNECTION);
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
        nome, cpf, email
    });
    return response.json({ retornoAluno });
});

app.put('/:id', async (request, response) => {
    //route params guid
    const { id } = request.params;
    const { nome, email, cpf } = request.body;

    const alunoRetorno = await AlunoRepositorio.find({ cpf: id });
    if (alunoRetorno.length == 0) {
        return response.status(404).json({ "error": "Student not found" });
    }
    const alunoAtualizado = await AlunoRepositorio.updateOne({ cpf: id },
        {
            $set:
            {
                email, nome
            }
        }
    );
    return response.json(alunoAtualizado);
});

app.delete('/:id', async (request, response) => {
    const { id } = request.params;
    //id enviado existe no array?


    const alunoRetorno = await AlunoRepositorio.find({ cpf: id });
    console.log(alunoRetorno);
    if (alunoRetorno.length === 0) {
        return response.status(404).json({ "error": "Student not found" });
    }
    const alunoRemovido = await AlunoRepositorio.deleteOne({ cpf: id });

    return response.json({ "Message": `Student ${id} removed` });
});

//teste heroku publicação

//PORT variavel usada heroku
module.exports = app.listen(process.env.PORT || 3333, () => {
    console.log("Server running");
});

