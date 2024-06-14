const Fornecedor = require('../models/Fornecedor'); // Importe o modelo do fornecedor do Mongoose

async function validarDuplicidade(req, res, next) {
    const { email, telefone } = req.body;

    // Verifica se o email já está em uso
    const emailExistente = await Fornecedor.findOne({ email });
    if (emailExistente) {
        return res.status(400).json({ mensagem: "Email já está em uso" });
    }

    // Verifica se o telefone já está em uso
    const telefoneExistente = await Fornecedor.findOne({ telefone });
    if (telefoneExistente) {
        return res.status(400).json({ mensagem: "Telefone já está em uso" });
    }  next();
}
module.exports = {
    validarDuplicidade
};
