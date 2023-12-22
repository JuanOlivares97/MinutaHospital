const express = require('express');
const apiController = require("../controllers/apiController.js");

const router = express.Router()

router.get('/listar-tipovia', apiController.listarTipoVia)
router.get('/listar-tipocontrato', apiController.listarTipoContrato)
router.get('/listar-tipoestamento', apiController.listarTipoEstamento)
router.get('/listar-tiporegimen', apiController.listarTipoRegimen)
router.get('/listar-tiposervicio', apiController.listarTipoServicio)
router.get('/listar-tipounidad', apiController.listarTipoUnidad)

module.exports = router;