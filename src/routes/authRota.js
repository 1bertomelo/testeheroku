const { Router } = require('express');
const authService = require('../service/AuthService');

const Authroutes = Router();

Authroutes.post('/', async (request, response) => {
    console.log('oi');
    let { cpf } = request.body;
    const retornoToken = authService.gerarToken(cpf);
    console.log('oi h3');

    return response.json(retornoToken);
});

module.exports = Authroutes;