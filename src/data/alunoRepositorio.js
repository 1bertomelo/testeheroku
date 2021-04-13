//const database = require('../infra/database');
const AlunoRepositorio = require('../models/Aluno');


module.exports.buscaAluno = async function () {
    return await AlunoRepositorio.find();
}

module.exports.buscaAlunoPorCpf = async function (cpf) {
    return await AlunoRepositorio.findOne({ cpf });
}

module.exports.buscaAlunoPorEmail = async function (email) {
    return await AlunoRepositorio.findOne({ email });
}

module.exports.insereAluno = async function (novoAluno) {
    const { nome, cpf, email, senha } = novoAluno;
    const retornoAluno = await AlunoRepositorio.create({
        nome, cpf, email, senha
    });
    console.log('inserido..');
    console.log(retornoAluno);
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

module.exports.verificaEmailSenha = async function (email, senha) {
    return await AlunoRepositorio.findOne({ email, senha });
}