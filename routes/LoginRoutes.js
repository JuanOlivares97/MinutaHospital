const express = require('express');
const LoginController = require('../controllers/loginController.js')

const router = express.Router();

router.get('/', LoginController.mostrarLogin);

router.post('/login', LoginController.ValidacionLogin);

router.get('/recoverpassword', LoginController.formRecuperarContrasena);
router.post('/solicitud-restablecimiento',LoginController.RecuperarContrasena)
router.get('/changepassword',LoginController.formCambiarContrasena)
router.post('/confirmChangePassword', LoginController.cambiarContrasena)

router.get('/formEmail', LoginController.mostrarFormAddEmail); //mostrar formulario agregar email
router.post('/addEmail',LoginController.AddEmail) // guardar email




module.exports = router;
