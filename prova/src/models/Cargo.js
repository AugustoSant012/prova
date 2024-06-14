const mongoose = require('mongoose');

const CargoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    descricao: {
        type: String,
        required: true,
        trim: true
    },
    salario: { type: Number,
        required: true,
        min: 1200
    },
    ativoInativo: {
        type: Boolean,
        required: true,
        default: true
    }
});

const Cargo = mongoose.model('Cargo', CargoSchema);

module.exports = Cargo;