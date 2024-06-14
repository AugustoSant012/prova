const yup = require('yup');


const schema = yup.object().shape({
    nome: yup.string('O campo precisa ser um texto!').required('Campo obrigatório!'),
    cpfCnpj: yup.string('O campo precisa ser um texto!').required('Campo obrigatório!'),
    email: yup.string('O campo precisa ser um texto!').email('Email inválido!'),
    telefone: yup.string('O campo precisa ser um texto!'),
    dataContratacao: yup.date('Data inválida').required('Campo obrigatório!'),
    dataNascimento: yup.date('Data inválida').required('Campo obrigatório!'),
    genero: yup.string('Campo precisa ser texto').required('Campo obrigatório!'),
    cargo: yup.string('Campo precisa ser uma string'),
    derpartamento: yup.string('O campo precisa ser uma string')
});

// Função que executará a validação de funcionários que criamos
async function   validarFuncionario(req, res, next) {
    try {
        await schema.validate(req.body, { abortEarly: false }); 
        next();
    } catch (err) {
        const errors = err.inner.map(e => {
            const erro = {
                campo: e.path,
                erros: e.errors
            };
            return erro;
        });
        res.status(400).json({
            mensagem: "Falha na validação de campos!",
            erros: errors
        });
    }
}
module.exports = {
    validarFuncionario
} 