const express = require('express');
const Route = express.Router();

Route.get('/', (req, res) => {
    res.render('errorView', {mensaje:"No tienes privilegios para seguir anvanzando. Contacta al administrador."})
})

module.exports = Route;