const mongoose = require('mongoose')


const pedidoSchema = new mongoose.Schema(
    {
        idFuncionario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Funcionario',
            required: true
        },
        idCliente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cliente',
            required: true
        },
        produtos: [{
            idProduto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Produto',
                required: true
            },
            quantidade: {
                type: Number,
                required: true,
                validate: {
                    validator: Number.isInteger,
                    message: '{VALUE} não é um número inteiro válido'
                }
            },
            precoUnitario: {
                type: Number,
                required: true,
                min: 0
            }
        }],
        valorTotal: {
            type: Number,
            required: true,
            min: 0
        },
        dataPedido: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido
