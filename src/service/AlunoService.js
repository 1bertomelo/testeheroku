const AlunoRepositorio = require('../data/alunoRepositorio');

module.exports.buscaAluno = async function () {
    return await AlunoRepositorio.buscaAluno();
}

module.exports.insereAluno = function (novoAluno) {
    return AlunoRepositorio.insereAluno(novoAluno);
}