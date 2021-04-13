const AlunoRepositorio = require('../data/alunoRepositorio');

module.exports.buscaAluno = function () {
    return AlunoRepositorio.buscaAluno();
}

module.exports.buscaAlunoPorCpf = function (cpf) {
    return AlunoRepositorio.buscaAlunoPorCpf(cpf);
}

module.exports.insereAluno = function (novoAluno) {
    //aluno existe ou não
    const alunoRetorno = AlunoRepositorio.buscaAlunoPorCpf(novoAluno.cpf);
    if (alunoRetorno.length == 0) {
        return null;
    }
    return AlunoRepositorio.insereAluno(novoAluno);
}

module.exports.atualizaAluno = function (atualizaAluno) {

    //aluno existe ou não
    const alunoRetorno = AlunoRepositorio.buscaAlunoPorCpf(atualizaAluno.cpf);
    if (alunoRetorno.length == 0) {
        return false;
    }
    const resultadoAluno = AlunoRepositorio.atualizaAluno(atualizaAluno);
    return true;
}


module.exports.removeAluno = function (cpf) {

    //aluno existe ou não
    const alunoRetorno = AlunoRepositorio.buscaAlunoPorCpf(cpf);
    if (alunoRetorno.length == 0) {
        return false;
    }
    const resultadoAluno = AlunoRepositorio.removeAluno(cpf);
    return true;
}

module.exports.verificaEmailSenha = function (email, senha) {
    return AlunoRepositorio.verificaEmailSenha(email, senha);
}

module.exports.buscaAlunoPorEmail = function (email) {
    return AlunoRepositorio.buscaAlunoPorEmail(email);
}