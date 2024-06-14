const Fornecedor = require('../models/Fornecedor'); // Importa o modelo Fornecedor

// Criar um novo fornecedor
async function create(req, res) {
    const fornecedor = new Fornecedor(req.body); // Cria um novo fornecedor com os dados da requisição
    const fornecedorCriado = await fornecedor.save(); // Salva o fornecedor no banco de dados
    res.status(201).json(fornecedorCriado); // Retorna o fornecedor criado com status 201
}

// Obter todos os fornecedores
async function getAll(req, res) {
    res.json(await Fornecedor.find()); // Retorna todos os fornecedores do banco de dados
}

// Obter um fornecedor por ID
async function getById(req, res) {
    const fornecedor = await Fornecedor.findById(req.params.id); // Busca o fornecedor pelo ID fornecido
    if (fornecedor) {
        res.json(fornecedor); // Retorna o fornecedor encontrado
    } else {
        res.status(404).json({ mensagem: "Fornecedor não encontrado!" }); // Retorna erro 404 se não encontrar o fornecedor
    }
}

// Atualizar um fornecedor por ID
async function update(req, res) {
    const fornecedorAtualizado = await Fornecedor.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Atualiza o fornecedor com os dados fornecidos
    if (fornecedorAtualizado) {
        res.json(fornecedorAtualizado); // Retorna o fornecedor atualizado
    } else {
        res.status(404).json({ mensagem: "Fornecedor não encontrado!" }); // Retorna erro 404 se não encontrar o fornecedor
    }
}

// Remover um fornecedor por ID
async function remove(req, res) {
    const fornecedorDeletado = await Fornecedor.findByIdAndDelete(req.params.id); // Remove o fornecedor pelo ID fornecido
    if (fornecedorDeletado) {
        res.json({
            mensagem: "Fornecedor deletado com sucesso!",
            fornecedorDeletado
        }); // Retorna mensagem de sucesso e o fornecedor deletado
    } else {
        res.status(400).json({ mensagem: "Erro ao deletar!" }); // Retorna erro 400 se não encontrar o fornecedor
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
