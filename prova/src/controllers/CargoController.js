const Cargo = require('../models/Cargo'); // Importa o modelo Cargo

// Criar um novo cargo
async function create(req, res) {
    const cargo = new Cargo(req.body); // Cria um novo cargo com os dados da requisição
    const cargoCriado = await cargo.save(); // Salva o cargo no banco de dados
    res.status(201).json(cargoCriado); // Retorna o cargo criado com status 201
}

// Obter todos os cargos
async function getAll(req, res) {
    res.json(await Cargo.find()); // Retorna todos os cargos do banco de dados
}

// Obter um cargo por ID
async function getById(req, res) {
    const cargo = await Cargo.findById(req.params.id); // Busca o cargo pelo ID fornecido
    if (cargo) {
        res.json(cargo); // Retorna o cargo encontrado
    } else {
        res.status(404).json({ mensagem: "Cargo não encontrado!" }); // Retorna erro 404 se não encontrar o cargo
    }
}

// Atualizar um cargo por ID
async function update(req, res) {
    const atualizarCargo = await Cargo.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Atualiza o cargo com os dados fornecidos
    if (atualizarCargo) {
        res.json(atualizarCargo); // Retorna o cargo atualizado
    } else {
        res.status(404).json({ mensagem: "Cargo não encontrado!" }); // Retorna erro 404 se não encontrar o cargo
    }
}

// Remover um cargo por ID
async function remove(req, res) {
    const procurarDELETAR = await Cargo.findByIdAndDelete(req.params.id); // Remove o cargo pelo ID fornecido
    if (procurarDELETAR) {
        res.json({
            mensagem: "Cargo deletado com sucesso!",
            procurarDELETAR
        }); // Retorna mensagem de sucesso e o cargo deletado
    } else {
        res.status(400).json({ mensagem: "Erro ao deletar!" }); // Retorna erro 400 se não encontrar o cargo
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
