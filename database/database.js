require('dotenv').config(); // Esto cargará el archivo .env automáticamente

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conexión a la base de datos exitosa como ID ' + connection.threadId);
});

module.exports = connection;
