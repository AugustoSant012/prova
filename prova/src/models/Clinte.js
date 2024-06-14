const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    cpfCnpj: {
        type: String,
        required: true

    },
    telefone:{
        type: String,
        required: true
    },
    endereco: {
        cep: String,
        uf: String,
        logradouro: String,
        localidade: String,
        bairro: String,
        numero: String,
        complemento: String
    },

},{
    timeseries: true
}
)
const Cliente = mongoose.model('Cliente',schema)

module. exports=Cliente