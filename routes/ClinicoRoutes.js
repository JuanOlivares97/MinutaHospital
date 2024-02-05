const express = require('express');
const HospitalizadoController = require("../controllers/Clinico/HospitalizadoController.js");
const Route = express.Router();

Route.get('/', HospitalizadoController.mostrarPaginaHospitalizados)

// API Para listar Registros
Route.get('/listar-hospitalizado', HospitalizadoController.listarHospitalizados);
Route.get('/listar-antecedentes', HospitalizadoController.listarhistorial)
// Ruta para procesar el formulario de agregar un hospitalizado
Route.post('/agregar-hospitalizado', HospitalizadoController.agregarHospitalizado);

// Ruta para procesar el formulario de editar un hospitalizado
Route.post('/editar-servicio-hospitalizado', HospitalizadoController.actualizarServicioHospitalizado);
Route.post('/editar-alta-hospitalizado', HospitalizadoController.actualizarAltaHospitalizado);

module.exports = Route;