//const database = require('../infra/database');
const AlunoRepositorio = require('../models/Aluno');

module.exports.buscaAluno = async function () {
    console.log('oi h2');
    return await AlunoRepositorio.find();
}

module.exports.buscaAlunoPorCpf = async function (cpf) {
    return await AlunoRepositorio.find({ cpf });
}

module.exports.insereAluno = async function (novoAluno) {
    const { nome, cpf, email } = novoAluno;
    const retornoAluno = await AlunoRepositorio.create({
        nome, cpf, email
    });
    return retornoAluno;
}

module.exports.atualizaAluno = async function (atualizaAluno) {
    const { nome, cpf, email } = atualizaAluno;
    const alunoAtualizado = await AlunoRepositorio.updateOne(
        { cpf },//filtro
        {//campos que sao atualizado
            $set:
            {
                email, nome
            }
        }
    );
    return alunoAtualizado;
}

module.exports.removeAluno = async function (cpf) {
    return await AlunoRepositorio.deleteOne({ cpf });
}