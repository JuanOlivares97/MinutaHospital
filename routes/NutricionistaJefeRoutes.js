const express = require('express');
const HospitalizadoController = require("../controllers/HospitalzadoController.js");

const Route = express.Router();

Route.get('/', (req, res) => {
    res.render('hospitalizadoview');
});

Route.get('/listar-hospitalizado', HospitalizadoController.ListarHospitalizados);
    res.send('HOLA');
});
// Ruta para mostrar el formulario de agregar un hospitalizado
Route.get('/agregar-hospitalizado', HospitalizadoController.mostrarFormularioAgregar);

// Ruta para procesar el formulario de agregar un hospitalizado
Route.post('/agregar-hospitalizado', HospitalizadoController.agregarHospitalizado);

// Ruta para mostrar el formulario de editar un hospitalizado
Route.get('/editar-hospitalizado/:rut', HospitalizadoController.mostrarFormularioEditar);

// Ruta para procesar el formulario de editar un hospitalizado
Route.post('/editar-hospitalizado/:rut', HospitalizadoController.actualizarHospitalizado);

Route.post('/eliminar-hospitalizado/:rut', HospitalizadoController.eliminarHospitalizado);

module.exports = Route;