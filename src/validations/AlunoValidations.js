const { body, validationResult } = require('express-validator')
const AlunoValidationRules = () => {
    return [
        body('email').isEmail().withMessage("E-mail inválido"),
        body('cpf').isLength({ min: 11, max: 11 }).withMessage("Tamanho deve ser de 11 caracteres"),
    ]
}

module.exports = {
    AlunoValidationRules,
}