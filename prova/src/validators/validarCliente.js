const yup = require('yup');

const clienteSchema = yup.object().shape({
    nome: yup.string().required('Campo obrigatório!'),
    cpfCnpj: yup.string().required('Campo obrigatório!'),
    telefone: yup.string(),
    endereco: yup.object().shape({
        cep: yup.string().required('Campo obrigatório!'),
        uf: yup.string().required('Campo obrigatório!'),
        logradouro: yup.string().required('Campo obrigatório!'),
        localidade: yup.string().required('Campo obrigatório!'),
        bairro: yup.string().required('Campo obrigatório!'),
        numero: yup.string().required('Campo obrigatório!'),
        complemento: yup.string()
    })
});

async function validarCliente(req, res, next) {
    try {
        await clienteSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (err) {
        const errors = err.inner.map(e => ({
            campo: e.path,
            erros: e.errors
        }));
        res.status(400).json({
            mensagem: "Falha na validação de campos do cliente!",
            erros: errors
        });
    }
}

module.exports = {
    validarCliente
};
