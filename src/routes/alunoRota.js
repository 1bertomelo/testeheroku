const { Router } = require('express');
const alunoService = require('../service/AlunoService');

const routes = Router();

//preparar para usar o express;

routes.get('/', async (request, response) => {
    const retornoAluno = await alunoService.buscaAluno();
    return response.json(retornoAluno);
});


routes.post('/', async (request, response) => {
    const { nome, email, cpf } = request.body;
    //destruturação 
    const novoAluno = { nome, email, cpf };
    const retornoAluno = await alunoService.insereAluno(novoAluno);
    return response.json({ retornoAluno });
});

routes.put('/:id', async (request, response) => {
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

routes.delete('/:id', async (request, response) => {
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


module.exports = routes;