const express = require('express');
const HospitalizadoController = require("../controllers/NutricionistaJefe/HospitalizadoController.js");
const FuncionarioController = require("../controllers/NutricionistaJefe/FuncionarioController.js");
const mantenedorController = require('../controllers/NutricionistaJefe/MantenedorController.js');
const dashboardController = require('../controllers/NutricionistaJefe/DashboardController.js');
const reportesController = require('../controllers/NutricionistaJefe/reportesController.js');
const Route = express.Router();

Route.get('/', HospitalizadoController.mostrarPaginaHospitalizados)
Route.get('/funcionarios', FuncionarioController.mostrarPaginaFuncionarios);

// API Para listar Registros
Route.get('/listar-hospitalizado', HospitalizadoController.listarHospitalizados);
Route.get('/listar-funcionario', FuncionarioController.listarFuncionarios);
Route.get('/listar-antecedentes', HospitalizadoController.listarhistorial)
// Ruta para procesar el formulario de agregar un hospitalizado
Route.post('/agregar-hospitalizado', HospitalizadoController.agregarHospitalizado);
Route.post('/agregar-funcionario', FuncionarioController.agregarFuncionarios);

// Ruta para procesar el formulario de editar un hospitalizado
Route.post('/editar-servicio-hospitalizado', HospitalizadoController.actualizarServicioHospitalizado);
Route.post('/editar-alta-hospitalizado', HospitalizadoController.actualizarAltaHospitalizado);
Route.post('/editar-ayuno', HospitalizadoController.actualizarAyuno)
Route.post('/editar-observaciones', HospitalizadoController.actualizarObervaciones)
Route.post('/editar-funcionario', FuncionarioController.actualizarFuncionarios)
Route.post('/deshabilitar-funcionario', FuncionarioController.deshabilitarFuncionarios)


Route.get('/mantenedores', mantenedorController.mostrarVistaMantenedores)
Route.post('/agregar-via',mantenedorController.agregarTipoVia)
Route.post('/agregar-contrato',mantenedorController.agregarTipoContrato)
Route.post('/agregar-estamento',mantenedorController.agregarTipoEstamento)
Route.post('/agregar-funcionario',mantenedorController.agregarTipoFuncionario)
Route.post('/agregar-regimen',mantenedorController.agregarTipoRegimen)
Route.post('/agregar-servicio',mantenedorController.agregarTipoServicio)
Route.post('/agregar-unidad',mantenedorController.agregarTipoUnidad)
Route.post('/editar-mantenedor', mantenedorController.editarMantenedores)



Route.get('/reportes',reportesController.mostrarViewReportes)


Route.get('/dashboard', dashboardController.mostrarDashboard); //Listo
Route.get('/colacion-funcionarios', dashboardController.colacionFuncionarios)
Route.get('/colacion-hospitalizados', dashboardController.colacionHospitalizados)

module.exports = Route;