const Produtos = require('../models/Produtos'); // Importa o modelo Produtos

// Criar um novo produto
async function create(req, res){
    const produtos = new Produtos(req.body); // Cria um novo produto com os dados da requisição
    const produtosCriados = await produtos.save(); // Salva o produto no banco de dados
    res.status(201).json(produtosCriados); // Retorna o produto criado com status 201
}

// Obter todos os produtos
async function getAll(req, res){
    res.json(await Produtos.find().populate(['fornecedor'])); // Retorna todos os produtos do banco de dados, populando o campo 'fornecedor'
}

// Obter um produto por ID
async function getById(req, res) {
    const produto = await Produtos.findById(req.params.id).populate(['fornecedor']); // Busca o produto pelo ID fornecido, populando o campo 'fornecedor'
    if (produto) {
        res.json(produto); // Retorna o produto encontrado
    } else {
        res.status(404).json({ mensagem: "Produto não encontrado" }); // Retorna erro 404 se não encontrar o produto
    }
}

// Atualizar um produto por ID
async function update(req, res) {
    const produtoAtualizado = await Produtos.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Atualiza o produto com os dados fornecidos
    if (produtoAtualizado) {
        res.json(produtoAtualizado); // Retorna o produto atualizado
    } else {
        res.status(404).json({ mensagem: "Produto não encontrado" }); // Retorna erro 404 se não encontrar o produto
    }
}

// Remover um produto por ID
async function remove(req, res){
    const produtoDeletado = await Produtos.findByIdAndDelete(req.params.id); // Remove o produto pelo ID fornecido
    if(produtoDeletado){
        res.json({ mensagem: "Produto excluído com sucesso", produtoDeletado }); // Retorna mensagem de sucesso e o produto deletado
    } else {
        res.status(404).json({ mensagem: "Produto não encontrado, informe um ID válido para ser excluído" }); // Retorna erro 404 se não encontrar o produto
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
