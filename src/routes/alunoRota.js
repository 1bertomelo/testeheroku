const { Router } = require('express');
const alunoService = require('../service/AlunoService');
const routes = Router();

routes.get('/aluno', async (request, response) => {
    const retornoAluno = await alunoService.buscaAluno();
    console.log('oi h3');

    return response.json(retornoAluno);
});

routes.get('/aluno/:cpf', async (request, response) => {
    const retornoAluno = await alunoService.buscaAluno();
    return response.json(retornoAluno);
});

routes.post('/aluno', async (request, response) => {
    const { nome, email, cpf } = request.body;
    //destruturação 
    const novoAluno = { nome, email, cpf };
    const retornoAluno = await alunoService.insereAluno(novoAluno);
    if (retornoAluno === null) {
        response.status(500).json({ "error": "CPF Student exists. Student do not be inserted" });
    }
    return response.status(201).json({ retornoAluno });
});

routes.put('/aluno/:cpf', async (request, response) => {
    //route params guid
    const { cpf } = request.params;
    const { nome, email } = request.body;
    const alunoAtualizar = { cpf, nome, email };

    const retornoAluno = await alunoService.atualizaAluno(alunoAtualizar);
    if (!retornoAluno)
        response.status(404).json({ "error": "Student not found" });

    return response.status(200).json({ "ok": "Student updated" });
});

routes.delete('/aluno/:cpf', async (request, response) => {
    const { cpf } = request.params;
    //id enviado existe no array?

    const retornoAluno = await alunoService.removeAluno(cpf);
    if (!retornoAluno)
        return response.status(404).json({ "error": "Student not found" });

    return response.json({ "Message": `Student ${id} removed` });
});


module.exports = routes;