const Pedido = require('../models/Pedido'); // Importa o modelo Pedido

// Criar um novo pedido
async function create(req, res) {
    const pedido = new Pedido(req.body); // Cria um novo pedido com os dados da requisição
    const pedidoCriado = await pedido.save(); // Salva o pedido no banco de dados
    res.status(201).json(pedidoCriado); // Retorna o pedido criado com status 201
}

// Obter todos os pedidos
async function getAll(req, res) {
    res.json(await Pedido.find()); // Retorna todos os pedidos do banco de dados
}

// Obter um pedido por ID
async function getById(req, res) {
    const pedido = await Pedido.findById(req.params.id); // Busca o pedido pelo ID fornecido
    if (pedido) {
        res.json(pedido); // Retorna o pedido encontrado
    } else {
        res.status(404).json({ mensagem: "Pedido não encontrado!" }); // Retorna erro 404 se não encontrar o pedido
    }
}

// Atualizar um pedido por ID
async function update(req, res) {
    const pedidoAtualizado = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Atualiza o pedido com os dados fornecidos
    if (pedidoAtualizado) {
        res.json(pedidoAtualizado); // Retorna o pedido atualizado
    } else {
        res.status(404).json({ mensagem: "Pedido não encontrado!" }); // Retorna erro 404 se não encontrar o pedido
    }
}

// Remover um pedido por ID
async function remove(req, res) {
    const pedidoDeletado = await Pedido.findByIdAndDelete(req.params.id); // Remove o pedido pelo ID fornecido
    if (pedidoDeletado) {
        res.json({
            mensagem: "Pedido deletado com sucesso!",
            pedidoDeletado
        }); // Retorna mensagem de sucesso e o pedido deletado
    } else {
        res.status(400).json({ mensagem: "Erro ao deletar pedido!" }); // Retorna erro 400 se não encontrar o pedido
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
