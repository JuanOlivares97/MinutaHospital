const express = require('express');
const db = require("../database/database.js");

const Route = express.Router();

Route.get('/', (req, res) => {
    res.render('loginview',{ titulo: 'Login Hospital' })
});

Route.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(username)
    db.query("SELECT * FROM Funcionario WHERE TRIM(CONCAT(`RutFuncionario`,'-',`DvFuncionario`)) = ? ", [username], (err, results) => {
      if (err) throw err;
      if (results.length === 1) {
        const user = results[0];
        console.log(user.contrasena)
        const isMatch = user.contrasena = password;
          if (isMatch) {
            // Autenticación exitosa, redirige en función del tipo de usuario
            if (user.IdTipoFuncionario === 1) {
              res.redirect('/Nutricionista');
            }else if(user.IdTipoFuncionario === 2) {
              res.redirect('/NutricionistaJefe');
            }else if(user.IdTipoFuncionario === 3){
              res.redirect('/Tecnico'); 
            }else if(user.IdTipoFuncionario === 4){
              res.redirect('/Clinico');
            }else if(user.IdTipoFuncionario === 5){
              res.redirect('/Recursos');
            }else if(user.IdTipoFuncionario === 6){
              res.redirect('/Recaudacion');
            }
          } else {
            res.send('Credenciales incorrectas');
          }
        
      } else {
        res.send('Usuario no encontrado');
      }
    });
});

module.exports = Route;
