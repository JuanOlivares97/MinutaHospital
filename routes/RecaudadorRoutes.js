const express = require('express');
const VentasController = require('../controllers/Recaudacion/VentasController.js')
const Route = express.Router();

Route.get('/', VentasController.mostrarVistaVentas)
Route.post('/agregar-venta', VentasController.agregarVenta)
Route.get('/listar-ventas', VentasController.listarVentas)
module.exports = Route;