const Cliente = require('../models/Cliente'); // Importa o modelo Cliente

// Criar um novo cliente
async function create(req, res) {
    const cliente = new Cliente(req.body); // Cria um novo cliente com os dados da requisição
    const criarCliente = await cliente.save(); // Salva o cliente no banco de dados
    res.status(200).json(criarCliente); // Retorna o cliente criado com status 200
}

// Obter todos os clientes
async function getAll(req, res) {
    res.json(await Cliente.find()); // Retorna todos os clientes do banco de dados
}

// Obter um cliente por ID
async function getById(req, res) {
    const cliente = await Cliente.findById(req.params.id); // Busca o cliente pelo ID fornecido
    if (cliente) {
        res.json(cliente); // Retorna o cliente encontrado
    } else {
        res.status(404).json({ mensagem: "Cliente não encontrado!" }); // Retorna erro 404 se não encontrar o cliente
    }
}

// Atualizar um cliente por ID
async function update(req, res) {
    const atualizarCliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Atualiza o cliente com os dados fornecidos
    if (atualizarCliente) {
        res.json(atualizarCliente); // Retorna o cliente atualizado
    } else {
        res.status(404).json({ mensagem: "Cliente não encontrado! ID inválido" }); // Retorna erro 404 se não encontrar o cliente
    }
}

// Remover um cliente por ID
async function remove(req, res) {
    const clienteDel = await Cliente.findByIdAndDelete(req.params.id); // Remove o cliente pelo ID fornecido
    if (clienteDel) {
        res.json({
            mensagem: "Cliente deletado com sucesso!",
            clienteDel
        }); // Retorna mensagem de sucesso e o cliente deletado
    } else {
        res.status(400).json({ mensagem: "Erro ao deletar!" }); // Retorna erro 400 se não encontrar o cliente
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
