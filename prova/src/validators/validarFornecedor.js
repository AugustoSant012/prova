const yup = require('yup');

const fornecedorSchema = yup.object().shape({
    nome: yup.string().required('Campo obrigatório!'),
    email: yup.string().email('Email inválido!').required('Campo obrigatório!'),
    empresa: yup.string().required('Campo obrigatório!'),
    telefone: yup.string().required('Campo obrigatório!')
});

async function validarFornecedor(req, res, next) {
    try {
        await fornecedorSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (err) {
        const errors = err.inner.map(e => ({
            campo: e.path,
            erros: e.errors
        }));
        res.status(400).json({
            mensagem: "Falha na validação de campos do fornecedor!",
            erros: errors
        });
    }
}
module.exports = {
    validarFornecedor
};