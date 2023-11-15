const express = require('express');
const apiController = require("../controllers/apiController.js");

const router = express.Router()

router.get('/listar-tipovia', apiController.listarTipoVia)

module.exports = router;