const { Router } = require('express');
const authService = require('../service/AuthService');

const Authroutes = Router();

Authroutes.post('/', async (request, response) => {

    let { email, senha } = request.body;
    console.log(email);
    console.log(senha);

    const retornoToken = await authService.gerarToken(email, senha);

    return response.json(retornoToken);
});

module.exports = Authroutes;
