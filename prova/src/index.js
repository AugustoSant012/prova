const express = require('express')
const app = express()
const port = 3000

const DBConection = require('./database/connection')

//middleware
app.use(express.json())
const autenticacaoRoutes = require('./routes/autentificar.routes')
app.use(autenticacaoRoutes)

const {checarTOKEN} = require('./validators/autenticacaoValidator')

const router = require('./routes/routes')
app.use('/', checarTOKEN, router)

app.use(router)

app.listen(port, ()=> {
    DBConection() 
    console.log('Aplicação rodando em:', port)
})
