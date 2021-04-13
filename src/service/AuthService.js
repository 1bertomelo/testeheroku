const jwt = require('jsonwebtoken');
const AlunoService = require('../service/AlunoService');

module.exports.verificarToken = async (request, response, next) => {
    const token = request.header('Authorization').split(' ');

    try {
        if (token == undefined)
            throw new Error();
        console.log('token ' + token[1]);
        const data = jwt.verify(token[1], process.env.JWT_KEY);

        const aluno = await AlunoService.buscaAlunoPorEmail(data.email);
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

module.exports.gerarToken = async (email, senha) => {
    const aluno = await AlunoService.verificaEmailSenha(email, senha);
    if (aluno == null) {
        return ({ auth: false, token: null, message: "Error: Login or password wrong!" });;
    }
    const token = jwt.sign({ email: aluno.email }, process.env.JWT_KEY);
    return ({ auth: true, token: token, message: "OK" });
}

