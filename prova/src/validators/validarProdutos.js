const yup = require('yup');

const produtoSchema = yup.object().shape({
    nome: yup.string().required('Campo obrigatório!'),
    lote: yup.string().required('Campo obrigatório!'),
    dataValidade: yup.date().required('Campo obrigatório!')

});
async function validarProduto(req, res, next) {
    try {
        await produtoSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (err) {
        const errors = err.inner.map(e => ({
            campo: e.path,
            erros: e.errors
        }));
        res.status(400).json({
            mensagem: "Falha na validação de campos do produto!",
            erros: errors
        });
    }
}
module.exports = {
    validarProduto
};
