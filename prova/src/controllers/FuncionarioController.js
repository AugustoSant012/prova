const Funcionario = require('../models/Funcionario'); // Importa o modelo Funcionario

// Criar um novo funcionário
async function create(req, res) {
    const funcionario = new Funcionario(req.body); // Cria um novo funcionário com os dados da requisição
    const funcionarioCriado = await funcionario.save(); // Salva o funcionário no banco de dados
    res.status(201).json(funcionarioCriado); // Retorna o funcionário criado com status 201
}

// Obter todos os funcionários
async function getAll(req, res) {
    res.json(await Funcionario.find().populate(['cargo'])); // Retorna todos os funcionários do banco de dados e popula o campo 'cargo'
}

// Obter um funcionário por ID
async function getById(req, res) {
    const funcionario = await Funcionario.findById(req.params.id).populate(['cargo']); // Busca o funcionário pelo ID fornecido e popula o campo 'cargo'
    if (funcionario) {
        res.json(funcionario); // Retorna o funcionário encontrado
    } else {
        res.status(404).json({ mensagem: "Funcionário não encontrado!" }); // Retorna erro 404 se não encontrar o funcionário
    }
}

// Atualizar um funcionário por ID
async function update(req, res) {
    const funcionarioAtualizado = await Funcionario.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Atualiza o funcionário com os dados fornecidos
    if (funcionarioAtualizado) {
        res.json(funcionarioAtualizado); // Retorna o funcionário atualizado
    } else {
        res.status(404).json({ mensagem: "Funcionário não encontrado!" }); // Retorna erro 404 se não encontrar o funcionário
    }
}

// Remover um funcionário por ID
async function remove(req, res) {
    const funcionarioDeletado = await Funcionario.findByIdAndDelete(req.params.id); // Remove o funcionário pelo ID fornecido
    if (funcionarioDeletado) {
        res.json({
            mensagem: "Funcionário deletado com sucesso!",
            funcionarioDeletado
        }); // Retorna mensagem de sucesso e o funcionário deletado
    } else {
        res.status(400).json({ mensagem: "Erro ao deletar funcionário!" }); // Retorna erro 400 se não encontrar o funcionário
    }
}

// Exporta as funções para serem usadas em outras partes da aplicação
module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
};
