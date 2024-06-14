const yup = require('yup');

const pedidoSchema = yup.object().shape({
    idFuncionario: yup.string().required('ID do funcionário é obrigatório'),
    idCliente: yup.string().required('ID do cliente é obrigatório'),
    produtos: yup.array().of(
        yup.object().shape({
            idProduto: yup.string().required('ID do produto é obrigatório'),
            quantidade: yup.number().positive('Quantidade deve ser um número positivo').required('Quantidade é obrigatória'),
            precoUnitario: yup.number().positive('Preço unitário deve ser um número positivo').required('Preço unitário é obrigatório')
        })
    ).required('Pelo menos um produto deve ser especificado'),
    valorTotal: yup.number().positive('Valor total deve ser um número positivo').required('Valor total é obrigatório'),
    dataPedido: yup.date().required('Data do pedido é obrigatória')
});
async function validarPedido(req, res, next) {
    try {
        await pedidoSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (err) {
        const errors = err.inner.map(e => ({
            campo: e.path,
            erros: e.errors
        }));
        res.status(400).json({
            mensagem: "Falha na validação de campos do pedido!",
            erros: errors
        });
    }
}
module.exports = {
    validarPedido
};
