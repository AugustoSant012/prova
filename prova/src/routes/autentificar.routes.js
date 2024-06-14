const express = require('express')
const router = express.Router()



const autenticacaoController = require('../controllers/AutenticaoController')
const {usuarioVALIDADOR} = require('../validators/autenticacaoValidator')
const {loginVALIDADOR} = require('../validators/autenticacaoValidator')


router.post('/auth/registro', usuarioVALIDADOR, autenticacaoController.registrar)


router.post('/auth/login', loginVALIDADOR, autenticacaoController.login)







module.exports = router

