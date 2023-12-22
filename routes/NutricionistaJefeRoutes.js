const express = require('express');
const HospitalizadoController = require("../controllers/HospitalzadoController.js");
const FuncionarioController = require("../controllers/FuncionarioController.js");
const Route = express.Router();

Route.get('/', HospitalizadoController.mostrarPaginaHospitalizados)
Route.get('/funcionarios', FuncionarioController.mostrarPaginaFuncionarios);

// API Para listar Registros
Route.post('/listar-hospitalizado', HospitalizadoController.listarHospitalizados);

Route.get('/listar-funcionario', FuncionarioController.listarFuncionarios);

// Ruta para procesar el formulario de agregar un hospitalizado
Route.post('/agregar-hospitalizado', HospitalizadoController.agregarHospitalizado);

// Ruta para mostrar el formulario de editar un hospitalizado
Route.get('/editar-hospitalizado/:rut', HospitalizadoController.mostrarFormularioEditar);

// Ruta para procesar el formulario de editar un hospitalizado
Route.post('/editar-hospitalizado/:rut', HospitalizadoController.actualizarHospitalizado);

Route.post('/eliminar-hospitalizado/:rut', HospitalizadoController.eliminarHospitalizado);

module.exports = Route;