const yup = require('yup');

const cargoSchema = yup.object().shape({
    nome: yup.string().required('Campo obrigatório!'),
    descricao: yup.string().required('Campo obrigatório!'),
    salario: yup.number().required('Campo obrigatório!'),
    ativoInativo: yup.boolean().required('Campo obrigatório!')
});

async function validarCargo(req, res, next) {
    try {
        await cargoSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (err) {
        const errors = err.inner.map(e => ({
            campo: e.path,
            erros: e.errors
        }));
        res.status(400).json({
            mensagem: "Falha na validação de campos do cargo!",
            erros: errors
        });
    }
}

module.exports = {
    validarCargo
};
