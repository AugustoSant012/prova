const Funcionario = require('../models/Funcionario');


async function validarDocumentosFuncionario(req, res, next) {
    try {
        const { cpfCnpj, telefone, email } = req.body;

        // Verifica se o CPF/CNPJ já está em uso
        const cpfCnpjExistente = await Funcionario.findOne({ cpfCnpj });
        if (cpfCnpjExistente) {
            return res.status(400).json({
                mensagem: "Falha na validação de campos!",
                erros: [{ campo: 'cpfCnpj', erros: ['CPF/CNPJ já está em uso!'] }]
            });
        }

        // Verifica se o telefone já está em uso
        const telefoneExistente = await Funcionario.findOne({ telefone });
        if (telefoneExistente) {
            return res.status(400).json({
                mensagem: "Falha na validação de campos!",
                erros: [{ campo: 'telefone', erros: ['Telefone já está em uso!'] }]
            });
        }

        // Verifica se o email já está em uso
        const emailExistente = await Funcionario.findOne({ email });
        if (emailExistente) {
            return res.status(400).json({
                mensagem: "Falha na validação de campos!",
                erros: [{ campo: 'email', erros: ['Email já está em uso!'] }]
            });
        }
        next();
    } catch (err) {
        res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}
module.exports = {
    validarDocumentosFuncionario
};
