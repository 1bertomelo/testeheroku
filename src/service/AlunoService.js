const AlunoRepositorio = require('../data/alunoRepositorio');

module.exports.buscaAluno = async function () {
    console.log('oi h1');
    const x = await AlunoRepositorio.buscaAluno();
    console.log('oi h4');
    return x;
}

module.exports.insereAluno = async function (novoAluno) {
    //aluno existe ou não
    const alunoRetorno = await AlunoRepositorio.buscaAlunoPorCpf(novoAluno.cpf);
    if (alunoRetorno.length == 0) {
        return null;
    }
    return AlunoRepositorio.insereAluno(novoAluno);
}

module.exports.atualizaAluno = async function (atualizaAluno) {

    //aluno existe ou não
    const alunoRetorno = await AlunoRepositorio.buscaAlunoPorCpf(atualizaAluno.cpf);
    if (alunoRetorno.length == 0) {
        return false;
    }
    const resultadoAluno = await AlunoRepositorio.atualizaAluno(atualizaAluno);
    return true;
}


module.exports.removeAluno = async function (cpf) {

    //aluno existe ou não
    const alunoRetorno = await AlunoRepositorio.buscaAlunoPorCpf(cpf);
    if (alunoRetorno.length == 0) {
        return false;
    }
    const resultadoAluno = await AlunoRepositorio.removeAluno(cpf);
    return true;
}