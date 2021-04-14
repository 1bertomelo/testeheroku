const { Router } = require('express');
const alunoService = require('../service/AlunoService');
const autenticacaoJWT = require('../service/authService');
const { validate } = require('../validations/validations');
const { AlunoValidationRules } = require('../validations/AlunoValidations');

const routes = Router();
//autenticacaoJWT.verificarToken
routes.get('/', autenticacaoJWT.verificarToken, async (request, response) => {
    const retornoAluno = await alunoService.buscaAluno();
    return response.json(retornoAluno);
});

routes.get('/:cpf', autenticacaoJWT.verificarToken, async (request, response) => {
    const { cpf } = request.params;
    const retornoAluno = await alunoService.buscaAlunoPorCpf(cpf);
    return response.json(retornoAluno);
});

routes.post('/', AlunoValidationRules(), validate, async (request, response) => {
    const { nome, email, cpf, senha } = request.body;
    //destruturação 

    if (nome === null || nome === "") {
        response.status(500).json({ "error": "name field is required!!" });
    }

    const novoAluno = { nome, email, cpf, senha };
    const retornoAluno = await alunoService.insereAluno(novoAluno);
    if (retornoAluno === null) {
        response.status(500).json({ "error": "CPF Student exists. Student do not be inserted" });
    }
    return response.status(201).json({ retornoAluno });
});

routes.put('/:cpf', autenticacaoJWT.verificarToken, async (request, response) => {
    //route params guid
    const { cpf } = request.params;
    const { nome, email } = request.body;
    const alunoAtualizar = { cpf, nome, email };

    const retornoAluno = await alunoService.atualizaAluno(alunoAtualizar);
    if (!retornoAluno)
        response.status(404).json({ "error": "Student not found" });

    return response.status(200).json({ "ok": "Student updated" });
});

routes.delete('/:cpf', autenticacaoJWT.verificarToken, async (request, response) => {
    const { cpf } = request.params;

    const retornoAluno = await alunoService.removeAluno(cpf);
    if (!retornoAluno)
        return response.status(404).json({ "error": "Student not found" });

    return response.json({ "Message": `Student ${cpf} removed` });
});


module.exports = routes;