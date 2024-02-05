const express = require('express');
const FuncionarioController = require("../controllers/Recursos/FuncionarioController.js");
const VentasController = require("../controllers/Recursos/VentasController.js")
const Route = express.Router();

Route.get('/', FuncionarioController.mostrarPaginaFuncionarios);
Route.get('/ventas', VentasController.mostrarVistaVentas);
// API Para listar Registros
Route.get('/listar-funcionario', FuncionarioController.listarFuncionarios);
// Ruta para procesar el formulario de agregar un hospitalizado
Route.post('/agregar-funcionario', FuncionarioController.agregarFuncionarios);

// Ruta para procesar el formulario de editar un hospitalizado
Route.post('/editar-funcionario', FuncionarioController.actualizarFuncionarios)
Route.post('/deshabilitar-funcionario', FuncionarioController.deshabilitarFuncionarios)

module.exports = Route;