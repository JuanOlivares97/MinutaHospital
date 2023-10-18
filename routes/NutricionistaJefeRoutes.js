const express = require('express');
const HospitalizadoController = require("../controllers/HospitalziadoController.js");

const Route = express.Router();

Route.get('/', (req, res) => {
    res.send('HOLA');
});

Route.get('/listar-hospitalizado', HospitalizadoController.ListarHospitalizados)

// Ruta para mostrar el formulario de agregar un hospitalizado
Route.get('/agregar-hospitalizado', HospitalizadoController.mostrarFormularioAgregar);

// Ruta para procesar el formulario de agregar un hospitalizado
Route.post('/agregar-hospitalizado', HospitalizadoController.agregarHospitalizado);

// Ruta para mostrar el formulario de editar un hospitalizado
Route.get('/editar-hospitalizado/:id', HospitalizadoController.mostrarFormularioEditar);

// Ruta para procesar el formulario de editar un hospitalizado
Route.post('/editar-hospitalizado/:id', HospitalizadoController.actualizarHospitalizado);

Route.get('/eliminar-hospitalizado/:id', HospitalizadoController.eliminarHospitalizado);

module.exports = Route;