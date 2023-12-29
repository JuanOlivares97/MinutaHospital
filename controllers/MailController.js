const nodemailer = require('nodemailer');
const emailConfig = require('../database/emailConfig.js');

MailController = {
    recuperarContraseña: (req, res) =>{
        const { email } = req.body;
        // Configura el transporte de nodemailer
        const transporter = nodemailer.createTransport(emailConfig);
    
        // Genera un token o enlace de restauración de contraseña
        const restorationLink = 'https://localhost:3000/restaurar/'; // Personaliza según tus necesidades
    
        // Configura el correo electrónico
        const mailOptions = {
            from: 'tu_correo@gmail.com',
            to: email,
            subject: 'Restauración de Contraseña',
            text: `Haz clic en el siguiente enlace para restaurar tu contraseña: ${restorationLink}`
        };
    
        // Envía el correo electrónico
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error: 'Error al enviar el correo electrónico' });
            }
    
            res.status(200).json({ message: 'Correo electrónico enviado con éxito' });
        });
    }
}