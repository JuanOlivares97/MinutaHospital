const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const db = require("./database/database");

const Route = express.Router();

Route.get('/login', (req, res) => {
    res.send(`
      <form method="post" action="/login">
        <input type="text" name="username" placeholder="Nombre de usuario" required><br>
        <input type="password" name="password" placeholder="Contraseña" required><br>
        <button type="submit">Iniciar Sesión</button>
      </form>
    `);
});

Route.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM usuarios WHERE username = ?', [username], (err, results) => {
      if (err) throw err;
      if (results.length === 1) {
        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
  
          if (isMatch) {
            // Autenticación exitosa, redirige en función del tipo de usuario
            if (user.userType === '') {
              res.redirect('/admin');
            } else {
              res.redirect('/user');
            }
          } else {
            res.send('Credenciales incorrectas');
          }
        });
      } else {
        res.send('Usuario no encontrado');
      }
    });
});

module.exports = Route;
