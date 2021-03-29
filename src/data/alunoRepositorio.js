//const database = require('../infra/database');
const AlunoRepositorio = require('../models/Aluno');

module.exports.buscaAluno = async function () {
    return await AlunoRepositorio.find();

}

module.exports.insereAluno = async function (novoAluno) {
    const { nome, cpf, email } = novoAluno;
    const retornoAluno = await AlunoRepositorio.create({
        nome, cpf, email
    });
    return retornoAluno;
}