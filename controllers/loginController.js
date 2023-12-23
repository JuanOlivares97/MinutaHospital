const db = require("../database/database.js");

const LoginController = {
    mostrarLogin:(req, res) =>{
        res.render('loginview',{ titulo: 'Login Hospital' })
    },
    ValidacionLogin: (req, res) => {
        const { username, password } = req.body;
        db.query("SELECT * FROM Funcionario WHERE TRIM(CONCAT(`RutFuncionario`,'-',`DvFuncionario`)) = ? ", [username], (err, results) => {
            if (err) throw err;
            if (results.length === 1) {
                const user = results[0]
                const isMatch = user.contrasena = password;
                if (isMatch) {
                    // Autenticación exitosa, redirige en función del tipo de usuario
                    if (user.IdTipoFuncionario === 1) {
                        res.redirect('/Nutricionista');
                    } else if (user.IdTipoFuncionario === 2) {
                        res.redirect('/NutricionistaJefe');
                    } else if (user.IdTipoFuncionario === 3) {
                        res.redirect('/Tecnico');
                    } else if (user.IdTipoFuncionario === 4) {
                        res.redirect('/Clinico');
                    } else if (user.IdTipoFuncionario === 5) {
                        res.redirect('/Recursos');
                    } else if (user.IdTipoFuncionario === 6) {
                        res.redirect('/Recaudacion');
                    }
                } else {
                    res.send('Credenciales incorrectas');
                }

            } else {
                res.send('Usuario no encontrado');
            }
        });
    }
}

module.exports = LoginController