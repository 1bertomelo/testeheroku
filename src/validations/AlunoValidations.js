const { body, validationResult } = require('express-validator')

//funcao que aplica validação nos alunos
//arrow function
const AlunoValidationRules = () => {
    return [
        //body('nome campo').funcao que usar
        body('email').isEmail().withMessage('Email inválido!'),
        body('email').notEmpty().withMessage('Email obrigatório'),
        body('cpf').notEmpty().withMessage('CPF obrigatório'),
        body('cpf').isLength({ min: 11, max: 11 }).withMessage('Tamanho deve ser de 11 caracteres'),
        body('nome').trim().notEmpty().withMessage('Nome é obrigatório'),
        body('nome').isLength({ min: 2, max: 100 }).withMessage('Tamanho do nome deve ser entre 2 e 100'),
        body('senha').not().isIn(['123', 'password', 'god'])
            .withMessage('A senha não pode ser palavras comuns')
            .notEmpty().isLength({ min: 8 }).withMessage('Senha deve ser conter no mínimo 8 caracteres')
    ]
}

module.exports = {
    AlunoValidationRules
}