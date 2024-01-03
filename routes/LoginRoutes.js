const express = require('express');
const LoginController = require('../controllers/loginController.js');
const ColacionController = require('../controllers/ColacionController.js');

const router = express.Router();

router.get('/', LoginController.mostrarLogin);

router.post('/login', LoginController.ValidacionLogin);

router.get('/recoverpassword', LoginController.formRecuperarContrasena);
router.post('/solicitud-restablecimiento',LoginController.RecuperarContrasena)
router.get('/changepassword',LoginController.formCambiarContrasena)
router.post('/confirmChangePassword', LoginController.cambiarContrasena)

router.get('/formEmail', LoginController.mostrarFormAddEmail); //mostrar formulario agregar email
router.post('/addEmail',LoginController.AddEmail) // guardar email

router.get('/colacion', ColacionController.mostrarFormColacion)
router.post('/agregar-colacion', ColacionController.agregarColacion)
router.get('/form-confirmar-colacion', ColacionController.confirmarColacion)
router.post('/checkin-colacion', ColacionController.actualizarEstadoColacion)

router.get('/logout',LoginController.logout)

module.exports = router;
