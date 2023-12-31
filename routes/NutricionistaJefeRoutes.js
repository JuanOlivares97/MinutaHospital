const express = require('express');
const HospitalizadoController = require("../controllers/NutricionistaJefe/HospitalizadoController.js");
const FuncionarioController = require("../controllers/NutricionistaJefe/FuncionarioController.js");
const Route = express.Router();

Route.get('/', HospitalizadoController.mostrarPaginaHospitalizados)
Route.get('/funcionarios', FuncionarioController.mostrarPaginaFuncionarios);

// API Para listar Registros
Route.get('/listar-hospitalizado', HospitalizadoController.listarHospitalizados);
Route.get('/listar-funcionario', FuncionarioController.listarFuncionarios);

// Ruta para procesar el formulario de agregar un hospitalizado
Route.post('/agregar-hospitalizado', HospitalizadoController.agregarHospitalizado);
Route.post('/agregar-funcionario', FuncionarioController.agregarFuncionarios);

// Ruta para procesar el formulario de editar un hospitalizado
Route.post('/editar-servicio-hospitalizado', HospitalizadoController.actualizarServicioHospitalizado);
Route.post('/editar-alta-hospitalizado', HospitalizadoController.actualizarAltaHospitalizado);

//Route.post('/eliminar-hospitalizado/:rut', HospitalizadoController.eliminarHospitalizado);

Route.get('/dashboard', HospitalizadoController.mostrarGrafico);

module.exports = Route;