const express = require('express');
const LoginController = require('../controllers/loginController.js')

const Route = express.Router();

Route.get('/', LoginController.mostrarLogin);

Route.post('/login', LoginController.ValidacionLogin);



module.exports = Route;
