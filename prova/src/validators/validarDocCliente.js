const Cliente = require('../models/Funcionario');


async function validarDocumentosCliente(req, res, next) {
    try {
        const { cpfCnpj, telefone, email } = req.body;

        // Verifica se o CPF/CNPJ já está em uso
        const cpfCnpjExistente = await Cliente.findOne({ cpfCnpj });
        if (cpfCnpjExistente) {
            return res.status(400).json({
                mensagem: "Falha na validação de campos!",
                erros: [{ campo: 'cpfCnpj', erros: ['CPF/CNPJ já está em uso!'] }]
            });
        }

        // Verifica se o telefone já está em uso
        const telefoneExistente = await Cliente.findOne({ telefone });
        if (telefoneExistente) {
            return res.status(400).json({
                mensagem: "Falha na validação de campos!",
                erros: [{ campo: 'telefone', erros: ['Telefone já está em uso!'] }]
            });
        }

       

        next();
    } catch (err) {
        res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

module.exports = {
    validarDocumentosCliente
};