const express = require('express');
const apiController = require("../controllers/apiController.js");

const router = express.Router()

router.get('/listar-TipoVia', apiController.listarTipoVia)
router.get('/listar-TipoContrato', apiController.listarTipoContrato)
router.get('/listar-TipoEstamento', apiController.listarTipoEstamento)
router.get('/listar-TipoRegimen', apiController.listarTipoRegimen)
router.get('/listar-TipoServicio', apiController.listarTipoServicio)
router.get('/listar-TipoUnidad', apiController.listarTipoUnidad)
router.get('/listar-TipoFuncionario', apiController.listarTipoFuncionario)

module.exports = router;