const express = require('express');
const router = express.Router();


const FuncionarioController = require('../controllers/FuncionarioController');
const CargoController = require('../controllers/CargoController');
const ClienteController = require('../controllers/ClienteController');
const ProdutoController = require('../controllers/ProdutoController');
const FornecedorController = require('../controllers/FornecedorController');
const PedidoController = require('../controllers/PedidoController');

// Validadores
const {validarFornecedor}= require('../validators/validarFornecedor')
const {validarDuplicidade}= require('../validators/validarDocFornecedor')
const { validarId } = require('../validators/idValidador');
const {validarFuncionario}= require('../validators/validarFuncionario');
const{validarDocumentosFuncionario}= require('../validators/ValidarDocFuncionario')
const {validarCargo}= require('../validators/validarCargo')
const {validarCliente}= require('../validators/validarCliente')
const {validarDocumentosCliente} = require('../validators/validarDocCliente')
const {validarPedido}= require('../validators/validarPedido')
const {validarProduto}= require('../validators/validarProdutos')
// Funcionário
router.post('/funcionario',validarFuncionario,validarDocumentosFuncionario, FuncionarioController.create);
router.get('/funcionario', FuncionarioController.getAll);
router.get('/funcionario/:id', validarId, FuncionarioController.getById);
router.put('/funcionario/:id', validarFuncionario,validarId, FuncionarioController.update);
router.delete('/funcionario/:id', validarId, FuncionarioController.remove);

// Cargo
router.post('/cargo',validarCargo, CargoController.create);
router.get('/cargo', CargoController.getAll);
router.get('/cargo/:id', validarId, CargoController.getById);
router.put('/cargo/:id',validarId,validarCargo, CargoController.update);
router.delete('/cargo/:id',validarId, CargoController.remove);


// Cliente
router.post('/cliente',validarCliente,validarDocumentosCliente, ClienteController.create);
router.get('/cliente', ClienteController.getAll);
router.get('/cliente/:id', validarId, ClienteController.getById);
router.put('/cliente/:id', validarCliente, validarId,ClienteController.update);
router.delete('/cliente/:id', validarId, ClienteController.remove);

// Produto
router.post('/produto',validarProduto, ProdutoController.create);
router.get('/produto', ProdutoController.getAll);
router.get('/produto/:id', validarId, ProdutoController.getById);
router.put('/produto/:id', validarId, ProdutoController.update);
router.delete('/produto/:id', validarId, ProdutoController.remove);

// Fornecedor
router.post('/fornecedor',validarFornecedor,validarDuplicidade, FornecedorController.create);
router.get('/fornecedor', FornecedorController.getAll);
router.get('/fornecedor/:id',validarId, FornecedorController.getById);
router.put('/fornecedor/:id',validarId, FornecedorController.update);
router.delete('/fornecedor/:id',validarId, FornecedorController.remove);

// Pedido
router.post('/pedido',validarPedido, PedidoController.create);
router.get('/pedido', PedidoController.getAll);
router.get('/pedido/:id',validarId, PedidoController.getById);
router.put('/pedido/:id',validarId, PedidoController.update);
router.delete('/pedido/:id',validarId, PedidoController.remove);

module.exports = router;


