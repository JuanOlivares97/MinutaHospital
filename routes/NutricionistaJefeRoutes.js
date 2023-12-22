const express = require('express');
const HospitalizadoController = require("../controllers/HospitalzadoController.js");
const FuncionarioController = require("../controllers/FuncionarioController.js");
const Route = express.Router();

Route.get('/', (req, res) => {
    res.redirect('/NutricionistaJefe/listar-hospitalizado');
});
Route.get('/mostrar-funcionario', FuncionarioController.mostrarFuncionarios);

Route.get('/listar-hospitalizado', HospitalizadoController.listarHospitalizados);
Route.get('/listar-funcionario', FuncionarioController.listarFuncionarios);

// Ruta para procesar el formulario de agregar un hospitalizado
Route.post('/agregar-hospitalizado', HospitalizadoController.agregarHospitalizado);

// Ruta para mostrar el formulario de editar un hospitalizado
Route.get('/editar-hospitalizado/:rut', HospitalizadoController.mostrarFormularioEditar);

// Ruta para procesar el formulario de editar un hospitalizado
Route.post('/editar-hospitalizado/:rut', HospitalizadoController.actualizarHospitalizado);

Route.post('/eliminar-hospitalizado/:rut', HospitalizadoController.eliminarHospitalizado);

Route.get('/buscar', async (req, res) => {
    try {
      // Conectarse a la base de datos
      const connection = await mysql.createConnection(dbConfig);
  
      // Realizar la consulta (cambiar 'nombre_de_tabla' y 'columna_busqueda' según tu caso)
      const [rows] = await connection.execute('SELECT * FROM nombre_de_tabla WHERE columna_busqueda = ?', [req.query.valor]);
  
      // Cerrar la conexión a la base de datos
      connection.end();
  
      // Enviar los resultados como respuesta
      res.json(rows);
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
      res.status(500).send('Error interno del servidor');
    }
  });

module.exports = Route;