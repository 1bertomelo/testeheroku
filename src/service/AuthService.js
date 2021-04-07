const jwt = require('jsonwebtoken');
const AlunoService = require('../service/AlunoService');

module.exports.verificarToken = async (request, response, next) => {
    const token = request.header('Authorization').split(' ');
    try {
        if (token == undefined)
            throw new Error();
        console.log('token ' + token[1]);
        const data = jwt.verify(token[1], process.env.JWT_KEY);

        const aluno = await AlunoService.buscaAluno(data.cpf);
        if (!aluno) {
            throw new Error();
        }
        request.user = aluno;
        request.token = token;
        next();
    }
    catch (error) {
        response.status(401).send({ 'error': 'Not Authorized' })
    }

}

module.exports.gerarToken = (cpf) => {
    console.log('gerar token ' + cpf);
    const aluno = AlunoService.buscaAluno(cpf);
    if (!aluno) {
        return null;
    }
    const token = jwt.sign({ cpf: aluno.cpf }, process.env.JWT_KEY);
    return ({ auth: true, token: token });
}
