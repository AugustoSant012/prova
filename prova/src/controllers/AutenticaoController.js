require('dotenv').config(); // Importa dotenv
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt'); // Criptografia de senha
const jwt = require('jsonwebtoken'); // Token

const JWT_SECRET = process.env.JWT_SECRET;

// Registrar
async function registrar(req, res) {
    const { nome, email, senha } = req.body;

    // Verificar se o email existe
    const usuarioEXISTE = await Usuario.findOne({ email });

    // Verificação
    if (usuarioEXISTE) {
        // Se o usuário existir, não será permitido outro cadastro com o mesmo email
        return res.status(400).json({ mensagem: "Usuário já existe!" }); // Parar a função aqui
    }

    // Caso o usuário não exista
    const hash = await bcrypt.hash(senha, 10); // Criptografia da senha

    // Registro do usuário
    const usuario = new Usuario({
        nome,
        email,
        senha: hash
    });

    await usuario.save(); // Salvar  no banco de dados

    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
}

// logar 
async function login(req, res) {
    const { email, senha } = req.body; // Requisição POST com email e senha
    const usuario = await Usuario.findOne({ email }); // Procurar email do usuário

    if (!usuario) {
        return res.status(401).json({ mensagem: "Usuário não cadastrado!" });
    }

    const senhaVALIDA = await bcrypt.compare(senha, usuario.senha); 
    if (!senhaVALIDA) {
        return res.status(401).json({ mensagem: "Usuário ou senha inválidos!" });
    }

    // Gerar token com expiração de 5 hora
    const token = jwt.sign({ email: usuario.email }, JWT_SECRET, { expiresIn: '5h' });

    res.json({
        mensagem: "Login efetuado com sucesso!",
        token
    });
}

module.exports = {
    registrar,
    login
};
