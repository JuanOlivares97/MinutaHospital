const db = require("../database/database.js");
const nodemailer = require('nodemailer');
const mailConfig = require('../database/emailConfig.js');


const LoginController = {
    mostrarLogin: (req, res) => {
        res.render("loginview", { titulo: "Login Hospital" });
    },
    ValidacionLogin: (req, res) => {
        const { username, password } = req.body;
        db.query(
            "SELECT TRIM(CONCAT(`RutFuncionario`,'-',`DvFuncionario`)) as 'Rut' ,`NombreFuncionario`,`correo`,`contrasena`, IdTipoFuncionario FROM Funcionario WHERE TRIM(CONCAT(`RutFuncionario`,'-',`DvFuncionario`)) = ? ",
            [username],
            (err, results) => {
                if (err) throw err;
                if (results.length === 1) {
                    const user = results[0];
    
                    if (!user.correo || user.correo.trim() === "") {
                        return res.redirect("/auth/formEmail");
                    }
    
                    const isMatch = user.contrasena === password;
                    if (isMatch) {
                        req.session.user = {
                            rut: user.Rut,
                            username: user.correo,
                            NombreCompleto: user.NombreFuncionario,
                            IdTipoFuncionario: user.IdTipoFuncionario
                        };
    
                        res.redirect('/auth/colacion');
                    } else {
                        res.render('errorView', {mensaje: "Credenciales Incorrectas" })
                    }
                } else {
                    res.render('errorView',{ mensaje: "Usuario no Encontrado" })
                }
            }
        );
    },
    formRecuperarContrasena: (req, res) => {
        res.render("recuperarContraseniaView");
    },
    RecuperarContrasena: (req, res) => {
        const { correo } = req.body;
        const user = getUserByEmail(correo, (err, user) => {
            if (err) {
                return res.render('errorView',{ error: 'Error al buscar el usuario: '+ err.message });
            }

            if (!user) {
                return res.render('errorView', { message: "Usuario no encontrado" });
            }

            enviarCorreoRestablecimiento(correo);

            return res
                .status(200)
                .json({ message: "Solicitud de restablecimiento enviada con éxito" });
        });
    },
    formCambiarContrasena: (req, res) => {
        res.render("cambiarContrasenaView");
    },
    cambiarContrasena: (req, res) => {
        const { user, newPassword } = req.body;

        updateUserPasswordByEmail(user, newPassword, (err, success) => {
            if (err) {
                return res.render('errorView',  { mensaje: err.message });
            }

            if (success) {
                return res.redirect('/')
            } else {
                return res.render('errorView', { message: 'Usuario no encontrado' });
            }
        });
    },
    mostrarFormAddEmail: (req, res) => {
        res.render("AgregarEmail");
    },
    AddEmail: (req, res) => {
        const { username, correo } = req.body;

        db.query(
            "UPDATE `Funcionario` SET `correo` = ? WHERE TRIM(CONCAT(`RutFuncionario`,'-',`DvFuncionario`)) = ? ",
            [correo, username],
            (err, results) => {
                if (err) {
                    return res.render('errorView', { mensaje: "Error al actualizar el correo electrónico", error: err });
                }
                if (results.affectedRows > 0) {
                    return res.redirect("/auth");
                } else {
                    const mensaje =
                        "No se ha agregado el correo electrónico, contáctate con el servicio técnico.  "+ err;
                    return res.render('errorView', { mensaje: mensaje, error: error });
                }
            }
        );
    },
};

function getRedirectPath(idTipoFuncionario) {
    switch (idTipoFuncionario) {
        case 1:
            return "/Nutricionista";
        case 2:
            return "/NutricionistaJefe";
        case 3:
            return "/Tecnico";
        case 4:
            return "/Clinico";
        case 5:
            return "/Recursos";
        case 6:
            return "/Recaudacion";
        default:
            return "/";
    }
}

function getUserByEmail(correo, callback) {
    const query = "SELECT * FROM Funcionario WHERE correo = ? LIMIT 1";

    db.query(query, [correo], (err, results) => {
        if (err) {
            return callback(err, null);
        }

        // Si results tiene al menos un elemento, devuelve ese elemento; de lo contrario, devuelve null
        const user = results.length > 0 ? results[0] : null;
        callback(null, user);
    });
}

function enviarCorreoRestablecimiento(email) {
    // Configuración del transportador (puedes ajustar según tus necesidades y proveedor de correo)
    const transporter = nodemailer.createTransport(mailConfig);

    // Configuración del correo electrónico
    const mailOptions = {
        from: 'ProyectoHospital15@gmail.com',  // Reemplaza con tu dirección de correo electrónico
        to: email,
        subject: 'Restablecimiento de Contraseña',
        text: `Favor ingresa al siguiente link: http://localhost:3000/auth/changepassword `
    };

    // Envía el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo electrónico:', error.message);
        } else {
            console.log('Correo electrónico enviado con éxito:', info.response);
        }
    });
}

function updateUserPasswordByEmail(user, newPassword, callback) {
    // Consulta SQL para actualizar la contraseña
    const sql = "UPDATE Funcionario SET contrasena = ? WHERE TRIM(CONCAT(`RutFuncionario`,'-',`DvFuncionario`)) = ?";
    // Ejecuta la consulta
    db.query(sql, [newPassword, user], (err, result) => {
        console.log('Resultado de la consulta:', result);
        if (err) {
            return callback(err, null);
        }

        // Comprueba si se actualizó al menos una fila
        if (result.affectedRows > 0) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    });
}



module.exports = LoginController;
